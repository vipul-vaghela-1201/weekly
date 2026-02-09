const MaterialItem = ({ item }) => (
  <div className="material-item">
    <span>{item.name}</span>
    <span>{item.quantity} x {item.rate}</span>
  </div>
);

export default MaterialItem;
