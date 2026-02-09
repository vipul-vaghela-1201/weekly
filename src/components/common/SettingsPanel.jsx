import Card from 'react-bootstrap/Card';
import ToggleSwitch from './UI/ToggleSwitch';

const SettingsPanel = ({ settings, onChange }) => (
  <Card className="settings-panel">
    <Card.Body>
      <Card.Title>Settings</Card.Title>
      <ToggleSwitch
        id="partial-deposit"
        label="Enable Partial Deposit Usage"
        checked={settings.enablePartialDeposit}
        onChange={(value) => onChange({ ...settings, enablePartialDeposit: value })}
      />
      <ToggleSwitch
        id="auto-save"
        label="Auto Save to Local Storage"
        checked={settings.autoSave}
        onChange={(value) => onChange({ ...settings, autoSave: value })}
      />
    </Card.Body>
  </Card>
);

export default SettingsPanel;
