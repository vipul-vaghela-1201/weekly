import { useCallback, useMemo, useState } from 'react';
import AppContext from './AppContext';
import { getInitialStoredState, useLocalStorage } from '../hooks/useLocalStorage';
import { useCustomerCalculations } from '../hooks/useCustomerCalculations';
import { useGroupSync } from '../hooks/useGroupSync';
import { getWeeklyDateRange } from '../services/syncService';

const sampleState = {
  customers: [
    {
      id: 'CUST001',
      name: 'XYZ Traders',
      lastWeekBalance: -20000,
      deposit: 12000,
      materialDeposit: 5000,
      materialDepositDetails: [],
      useDeposit: false,
      partialDepositAmount: 0,
      addToDeposit: false,
      creditAddedToDeposit: 0,
      originalDeposit: 12000,
      depositUsed: 0,
      thisWeekBusiness: 0,
      adjustments: 0,
      newBalance: -20000,
      isGroup: false,
      groupMembers: [],
      overpaymentToDeposit: false,
      overpaymentAmount: 0
    }
  ],
  groups: [
    {
      id: 'GROUP001',
      name: 'ABC Group',
      method: 'keyword',
      members: ['CUST001'],
      keyword: 'XYZ',
      description: 'Grouped by keyword: XYZ'
    }
  ],
  adjustments: [],
  settings: {
    enablePartialDeposit: false,
    autoSave: true,
    dateFormat: 'dd-mm-yyyy'
  },
  uiState: {
    activeTab: 'customers',
    selectedCustomer: null,
    searchQuery: ''
  }
};

const AppProvider = ({ children }) => {
  const stored = getInitialStoredState();
  const [customers, setCustomers] = useState(stored?.customers || sampleState.customers);
  const [groups, setGroups] = useState(stored?.groups || sampleState.groups);
  const [adjustments, setAdjustments] = useState(stored?.adjustments || sampleState.adjustments);
  const [settings, setSettings] = useState(stored?.settings || sampleState.settings);
  const [uiState, setUiState] = useState(stored?.uiState || sampleState.uiState);
  const [syncStatus, setSyncStatus] = useState('Synced');

  const calculatedCustomers = useCustomerCalculations(customers, settings);

  const handleGroupSync = useCallback((updatedGroups) => {
    setGroups(updatedGroups);
    setSyncStatus('Synced');
  }, []);

  useGroupSync(groups, calculatedCustomers, handleGroupSync);

  const weeklyDateRange = useMemo(() => getWeeklyDateRange(), []);

  const state = useMemo(
    () => ({
      customers: calculatedCustomers,
      rawCustomers: customers,
      groups,
      adjustments,
      settings,
      uiState,
      syncStatus,
      weeklyDateRange
    }),
    [calculatedCustomers, customers, groups, adjustments, settings, uiState, syncStatus, weeklyDateRange]
  );

  const actions = useMemo(
    () => ({
      setCustomers,
      setGroups,
      setAdjustments,
      setSettings,
      setUiState,
      setSyncStatus
    }),
    []
  );

  useLocalStorage(
    {
      customers,
      groups,
      adjustments,
      settings,
      uiState
    },
    settings.autoSave
  );

  return <AppContext.Provider value={{ state, actions }}>{children}</AppContext.Provider>;
};

export default AppProvider;
