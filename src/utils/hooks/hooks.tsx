import {ProductProps} from '../../store/product/product.types';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import DocumentPicker from 'react-native-document-picker';
import {InventoryProps} from '../../store/inventory/inventory.types';
import moment from 'moment';
import {DebtProps} from '../../store/debt/debt.types';

export const getProductList = (product: ProductProps[]) => {
  return product.map((item, _) => ({
    uid: item.uid,
    label: item.productName,
    value: item.productName,
    image: item.image,
    salesPrice: item.salesPrice,
  }));
};

export const sortByDate = (
  inventoryItems: InventoryProps[] | DebtProps[] | ProductProps[],
  isAscending: boolean,
) => {
  if (isAscending) {
    const result = inventoryItems.sort(
      (
        a: InventoryProps | DebtProps | ProductProps,
        b: InventoryProps | DebtProps | ProductProps,
      ) => moment(a.createdAt).diff(moment(b.createdAt)),
    );
    return result;
  }
  const result = inventoryItems.sort(
    (
      a: InventoryProps | DebtProps | ProductProps,
      b: InventoryProps | DebtProps | ProductProps,
    ) => moment(b.createdAt).diff(moment(a.createdAt)),
  );
  return result;
};

export const onGenerateQR = (
  inventory: InventoryProps[],
  product: ProductProps[],
  debt: DebtProps[],
) => {
  // const inv = [
  //   {uid: '1', title: 'a', createdAt: new Date().toString(), isActive: false},
  // ];
  // const prod = [
  //   {
  //     uid: '1',
  //     inventoryUid: '1',
  //     image: '',
  //     createdAt: new Date().toString(),
  //     productName: 'rebisco',
  //     stock: '1',
  //     originalPrice: '1',
  //     salesPrice: '1',
  //   },
  // ];
  // const debtes = [
  //   {
  //     uid: '1',
  //     name: 'arnolfo',
  //     inventoryUid: 'asa',
  //     createdAt: 'asa',
  //     items: {
  //       uid: '1',
  //       image: '',
  //       productName: 'rebiscor',
  //       salesPrice: '1',
  //       numberItems: '1',
  //     },
  //     isPaid: false,
  //   },
  // ];
  const all = {
    Inventory: inventory,
    Products: product,
    Debts: debt,
  };

  return JSON.stringify(all);
};
// function to handle exporting
export const exportDataToExcel = () => {
  // Created Sample data
  let sample_data_to_export = [
    {
      uid: '1',
      title: 'First User',
      isActive: false,
    },
    {
      inventoryUid: 1,
      image: './/asd',
      createdAt: null,
      productName: 'rebisco',
      stock: 10,
      originalPrice: 10,
      salesPrice: 12,
    },
    {
      inventoryUid: 1,
      image: './/asd',
      createdAt: null,
      productName: 'rebisco',
      stock: 10,
      originalPrice: 10,
      salesPrice: 12,
    },
    {
      uid: '4',
      title: 'Second User',
      as: false,
    },
  ];

  let wb = XLSX.utils.book_new();

  let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
  XLSX.utils.book_append_sheet(wb, ws, 'Users');
  const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

  // Write generated excel to Storage
  RNFS.writeFile(
    RNFS.DownloadDirectoryPath + '/my_exported_file2.xlsx',
    wbout,
    'ascii',
  )
    .then(r => {
      return r;
    })
    .catch(e => {
      throw e;
    });
};

export const importDataFromExcel = async () => {
  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });

    const data = await RNFS.readFile(result[0].uri, 'base64');

    const workbook = XLSX.read(data, {type: 'base64'});

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const ref = sheet['!ref'];
    if (!ref) return;
    const range = XLSX.utils.decode_range(ref);
    const minCol = range.s.c;
    const maxCol = range.e.c;
    const columns: string[] = [];
    for (let colIndex = minCol; colIndex <= maxCol; colIndex++) {
      columns.push(XLSX.utils.encode_col(colIndex));
    }

    for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      const row = XLSX.utils.encode_row(rowNum);
      const rowData: Record<string, string> = {};

      columns.forEach((column, _) => {
        const cellAddress = `${column}${row}`;
        const cell = sheet[cellAddress];
        rowData[column] = cell ? cell.v : '';
      });
      // You can destructure rowData properties here as needed
      // const {
      //   A: uid,
      //   B: title,
      //   C: isActive,
      //   D: productUid,
      //   E: inventoryUid,
      //   F: image,
      //   G: createdAt,
      //   H: productName,
      //   I: stock,
      //   J: originalPrice,
      //   K: salesPrice,
      // } = rowData;
    }
  } catch (error) {
    console.error('Error reading XLSX files:', error);
  }
};

// let sample_data_to_export = [
//   [
//     {
//       uid: 1,
//       title: 'sample',
//       createdAt: null,
//       isActive: false,
//       // products: [
//       //   {
//       //     uid: 1,
//       //     inventoryUid: 1,
//       //     image: './/asd',
//       //     createdAt: null,
//       //     productName: 'rebisco',
//       //     stock: 10,
//       //     originalPrice: 10,
//       //     salesPrice: 12,
//       //   },
//       // ],
//       // debts: [
//       //   {
//       //     uid: 1,
//       //     inventoryUid: 1,
//       //     name: 'arnolgo',
//       //     items: [
//       //       {
//       //         uid: 1,
//       //         image: '../as',
//       //         productName: 'rebisco',
//       //         salesPrice: 12,
//       //         numberItems: 2,
//       //       },
//       //     ],
//       //   },
//       // ],
//     },
//   ],
// ];
