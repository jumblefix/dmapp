import React from 'react';

interface IShoppingListProps {
  name: string;
}

export default class ShoppingList extends React.Component<IShoppingListProps> {
  render() {
    return (
      <div>
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}
