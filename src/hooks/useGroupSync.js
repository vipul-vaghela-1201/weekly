import { useEffect } from 'react';
import { recalculateGroup, updateKeywordGroupMembers } from '../utils/calculations';

export const useGroupSync = (groups, customers, onSync) => {
  useEffect(() => {
    const updatedGroups = groups.map((group) => {
      const updatedGroup = group.method === 'keyword'
        ? updateKeywordGroupMembers(group, customers)
        : group;
      return recalculateGroup(updatedGroup, customers);
    });
    onSync(updatedGroups);
  }, [groups, customers, onSync]);
};
