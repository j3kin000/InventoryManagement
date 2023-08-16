export type debtProps = {
  uid: string;
  inventoryUid: string;
  name: string;
  createdAt: string;
  item: itemProps[];
};

export type itemProps = {
  image: string;
  productName: string;
  price: string;
  itemNo: string;
};
const data = [
  {
    uid: '0',
    inventoryUid: '1',
    name: 'Rodolfo',
    item: [
      {
        productName: 'Rebisco',
        price: '15',
        itemNo: '12',
      },
      {
        productName: 'Chocolate',
        price: '19.1',
        itemNo: '12',
      },
    ],
    createdAt: '02/23/23:@3232',
    stock: '121',
    originalPrice: '12',
    salesPrice: '15',
  },
];
