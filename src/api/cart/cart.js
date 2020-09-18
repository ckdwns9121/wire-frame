import axios from "axios";
const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

const DEFAULT_URL = "http://devapi.ajoonamu.com/api/";

const initCart = [
  {
    isChecked: false,
    item: {
      item_img: null,
      item_name: "과일도시락.",
      item_option_id: null,
      item_price: 32000,
      item_quanity: 3,
    },

    options: [],
  },

  {
    isChecked: false,
    item: {
      item_img: null,
      item_name: "과일도시락.",
      item_option_id: null,
      item_price: 32000,
      item_quanity: 10,
    },
    options: [
      {
        created_at: "2020-07-16 16:45:11",
        item_id: 39,
        option_id: 227,
        option_name: "딸기.",
        option_price: 837,
        option_sales: 1,
        option_taxmny: 761,
        option_vatmny: 76,
        updated_at: "2020-07-16 16:45:11",
      },
    ],
  },
  { delivery_cost: 5000 },
];

export const getCartList = async (token) => {
  const req = DEFAULT_URL + "user/cart/list";
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios.get(req, config);
  console.log(result.data.query);
  return result.data.query;
};

export const getTestCartList = async () => {
  await sleep(1000); // 0.5초 쉬고
  return initCart; // list 배열
};
