import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomerForm from '../customers/CustomerForm';
import CustomerTable from '../customers/CustomerTable';
import GroupManagement from '../customers/GroupManagement';
import SummaryCards from '../common/SummaryCards';
import SettingsPanel from '../common/SettingsPanel';

const CustomerAccountsTab = ({
  customers,
  groups,
  settings,
  onAddCustomer,
  onUpdateCustomer,
  onDeleteCustomer,
  onUpdateGroups,
  onUpdateSettings
}) => (
  <div className="tab-section">
    <SummaryCards customers={customers} />
    <Row className="mt-4">
      <Col lg={8}>
        <CustomerForm customers={customers} onAdd={onAddCustomer} />
        <CustomerTable
          customers={customers}
          onUpdate={onUpdateCustomer}
          onDelete={onDeleteCustomer}
          enablePartialDeposit={settings.enablePartialDeposit}
        />
      </Col>
      <Col lg={4}>
        <SettingsPanel settings={settings} onChange={onUpdateSettings} />
        <GroupManagement groups={groups} customers={customers} onGroupsChange={onUpdateGroups} />
      </Col>
    </Row>
  </div>
);

export default CustomerAccountsTab;
