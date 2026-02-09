import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { validateGroup } from '../../utils/validators';

const GroupManagement = ({ groups, customers, onGroupsChange }) => {
  const [groupState, setGroupState] = useState({
    id: '',
    name: '',
    method: 'keyword',
    keyword: '',
    members: []
  });
  const [errors, setErrors] = useState({});

  const handleCreate = (event) => {
    event.preventDefault();
    const validation = validateGroup(groupState, groups.map((g) => g.id));
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    onGroupsChange([
      ...groups,
      {
        ...groupState,
        description:
          groupState.method === 'keyword'
            ? `Grouped by keyword: ${groupState.keyword}`
            : `Grouped by IDs: ${groupState.members.join(', ')}`
      }
    ]);
    setGroupState({ id: '', name: '', method: 'keyword', keyword: '', members: [] });
    setErrors({});
  };

  const toggleMember = (id) => {
    setGroupState((prev) => ({
      ...prev,
      members: prev.members.includes(id)
        ? prev.members.filter((member) => member !== id)
        : [...prev.members, id]
    }));
  };

  return (
    <div className="group-management">
      <Form onSubmit={handleCreate}>
        <div className="form-grid">
          <Form.Group>
            <Form.Label>Group ID</Form.Label>
            <Form.Control
              value={groupState.id}
              onChange={(event) => setGroupState((prev) => ({ ...prev, id: event.target.value }))}
              isInvalid={Boolean(errors.id)}
            />
            <Form.Control.Feedback type="invalid">{errors.id}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              value={groupState.name}
              onChange={(event) => setGroupState((prev) => ({ ...prev, name: event.target.value }))}
              isInvalid={Boolean(errors.name)}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Method</Form.Label>
            <Form.Select
              value={groupState.method}
              onChange={(event) => setGroupState((prev) => ({ ...prev, method: event.target.value }))}
            >
              <option value="keyword">Keyword</option>
              <option value="ids">Customer IDs</option>
            </Form.Select>
          </Form.Group>
          {groupState.method === 'keyword' ? (
            <Form.Group>
              <Form.Label>Keyword</Form.Label>
              <Form.Control
                value={groupState.keyword}
                onChange={(event) => setGroupState((prev) => ({ ...prev, keyword: event.target.value }))}
              />
            </Form.Group>
          ) : (
            <Form.Group>
              <Form.Label>Members</Form.Label>
              <div className="member-list">
                {customers.map((customer) => (
                  <Form.Check
                    key={customer.id}
                    label={`${customer.name} (${customer.id})`}
                    checked={groupState.members.includes(customer.id)}
                    onChange={() => toggleMember(customer.id)}
                  />
                ))}
              </div>
            </Form.Group>
          )}
        </div>
        <Button type="submit" className="mt-3">Create Group</Button>
      </Form>
      <ListGroup className="mt-4">
        {groups.map((group) => (
          <ListGroup.Item key={group.id}>
            <strong>{group.name}</strong> — {group.description}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default GroupManagement;
