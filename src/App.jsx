import { useContext, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Header from './components/common/Header';
import CustomerAccountsTab from './components/tabs/CustomerAccountsTab';
import WeeklyAdjustmentsTab from './components/tabs/WeeklyAdjustmentsTab';
import FinalReportsTab from './components/tabs/FinalReportsTab';
import AppProvider from './context/AppProvider';
import AppContext from './context/AppContext';
import { saveState } from './services/storageService';
import {
  exportReportCsv,
  mergeBusinessBillImport,
  parseCsv,
  toCustomerFromReportRow
} from './utils/exportImport';

const AppContent = () => {
  const { state, actions } = useContext(AppContext);
  const fileInputRef = useRef(null);
  const [importMode, setImportMode] = useState('report');

  const handleAddCustomer = (customer) => {
    actions.setCustomers([...state.rawCustomers, customer]);
    actions.setSyncStatus('Syncing');
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    actions.setCustomers(
      state.rawCustomers.map((customer) => (customer.id === updatedCustomer.id ? updatedCustomer : customer))
    );
    actions.setSyncStatus('Syncing');
  };

  const handleDeleteCustomer = (id) => {
    actions.setCustomers(state.rawCustomers.filter((customer) => customer.id !== id));
    actions.setSyncStatus('Syncing');
  };

  const handleAddAdjustment = (adjustment) => {
    const adjustmentId = `ADJ-${Date.now()}`;
    const updatedAdjustment = { ...adjustment, id: adjustmentId };
    actions.setAdjustments([updatedAdjustment, ...state.adjustments]);

    actions.setCustomers(
      state.rawCustomers.map((customer) => {
        if (customer.id !== adjustment.customerId) return customer;
        if (adjustment.type === 'cash') {
          return {
            ...customer,
            adjustments: Number(customer.adjustments || 0) + Number(adjustment.amount || 0)
          };
        }
        const materialValue = Number(adjustment.quantity || 0) * Number(adjustment.rate || 0);
        if (adjustment.asDeposit) {
          return {
            ...customer,
            materialDeposit: Number(customer.materialDeposit || 0) + materialValue,
            materialDepositDetails: [
              ...(customer.materialDepositDetails || []),
              {
                name: adjustment.item,
                quantity: adjustment.quantity,
                rate: adjustment.rate
              }
            ]
          };
        }
        return {
          ...customer,
          adjustments: Number(customer.adjustments || 0) - materialValue
        };
      })
    );
  };

  const handleDeleteAdjustment = (adjustmentId) => {
    actions.setAdjustments(state.adjustments.filter((adjustment) => adjustment.id !== adjustmentId));
  };

  const handleExport = () => {
    const blob = exportReportCsv(state.customers);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'weekly-report.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const openImport = (mode) => {
    setImportMode(mode);
    fileInputRef.current?.click();
  };

  const handleImport = async (event) => {
    const [file] = event.target.files || [];
    if (!file) return;

    const rows = await parseCsv(file);
    if (importMode === 'report') {
      actions.setCustomers(rows.map(toCustomerFromReportRow));
    } else {
      actions.setCustomers(mergeBusinessBillImport(state.rawCustomers, rows));
    }

    actions.setSyncStatus('Syncing');
    event.target.value = '';
  };

  const handleSave = () => {
    saveState({
      customers: state.rawCustomers,
      groups: state.groups,
      adjustments: state.adjustments,
      settings: state.settings,
      uiState: state.uiState
    });
    actions.setSyncStatus('Synced');
  };

  const handleGenerateNewReport = () => {
    actions.setCustomers(
      state.customers.map((customer) => ({
        ...customer,
        lastWeekBalance: customer.newBalance,
        thisWeekBusiness: 0,
        adjustments: 0,
        deposit: Number(customer.deposit || 0),
        materialDeposit: 0,
        materialDepositDetails: []
      }))
    );
    actions.setAdjustments([]);
    actions.setSyncStatus('Syncing');
  };

  return (
    <div className="app-shell">
      <Header status={state.syncStatus} />
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3 flex-wrap">
          <div>
            <h2 className="h4 mb-1">Weekly Customer Settlement System</h2>
            <p className="text-muted mb-0">Report date: {state.weeklyDateRange.reportDate.toLocaleDateString()}</p>
            <small className="text-muted d-block">
              This week business window: {state.weeklyDateRange.thisWeekMonday.toLocaleDateString()} -{' '}
              {state.weeklyDateRange.thisWeekFriday.toLocaleDateString()}
            </small>
            <small className="text-muted d-block">
              Last week balance window: {state.weeklyDateRange.lastWeekMonday.toLocaleDateString()} -{' '}
              {state.weeklyDateRange.lastWeekFriday.toLocaleDateString()}
            </small>
            <small className="text-muted d-block">
              Adjustment window: {state.weeklyDateRange.adjustmentStart.toLocaleDateString()} -{' '}
              {state.weeklyDateRange.thisWeekFriday.toLocaleDateString()}
            </small>
          </div>
          <ButtonGroup>
            <Button variant="outline-secondary" onClick={() => openImport('report')}>Import Report</Button>
            <Button variant="outline-secondary" onClick={() => openImport('bill')}>Import Bill</Button>
            <Button variant="outline-primary" onClick={handleExport}>Export Report</Button>
            <Button variant="outline-success" onClick={handleSave}>Save</Button>
            <Button variant="primary" onClick={handleGenerateNewReport}>Generate New Report</Button>
          </ButtonGroup>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="d-none"
            onChange={handleImport}
          />
        </div>
        <Tabs
          activeKey={state.uiState.activeTab}
          onSelect={(tab) => actions.setUiState({ ...state.uiState, activeTab: tab })}
          className="mb-3"
        >
          <Tab eventKey="customers" title="Customer Accounts">
            <CustomerAccountsTab
              customers={state.customers}
              groups={state.groups}
              settings={state.settings}
              onAddCustomer={handleAddCustomer}
              onUpdateCustomer={handleUpdateCustomer}
              onDeleteCustomer={handleDeleteCustomer}
              onUpdateGroups={actions.setGroups}
              onUpdateSettings={actions.setSettings}
            />
          </Tab>
          <Tab eventKey="adjustments" title="Weekly Adjustments">
            <WeeklyAdjustmentsTab
              customers={state.customers}
              adjustments={state.adjustments}
              onAddAdjustment={handleAddAdjustment}
              onDeleteAdjustment={handleDeleteAdjustment}
            />
          </Tab>
          <Tab eventKey="reports" title="Final Reports">
            <FinalReportsTab customers={state.customers} />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

const App = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
