/* eslint-disable react/prop-types */
import { Dispatch, SetStateAction } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';

type Props = {
  title: string;
  itemsList: string[];
  itemValue: string;
  setItemValue: Dispatch<SetStateAction<string>>;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  handleAdd: () => void;
};

const ItemAdd: React.FC<Props> = ({
  title,
  itemsList,
  itemValue,
  setItemValue,
  amount,
  setAmount,
  handleAdd,
}) => {
  return (
    <>
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="flex mb-5">
        <div className="flex items-center space-x-4 w-full">
          <select
            value={itemValue}
            onChange={(e) => setItemValue(e.target.value)}
            className="max-w-lg border rounded p-1 text-black"
          >
            <option value="">A vous de jouer !</option>
            {itemsList.map((itemOption, index) => (
              <option key={index} value={itemOption}>
                {itemOption}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value, 10))}
            className={`border rounded p-1 pl-4 w-16 text-black ${
              title === 'Aromates' ? 'opacity-0' : ''
            }`}
          />
          <label
            htmlFor="cl"
            className={`${title === 'Aromates' ? 'opacity-0' : ''}`}
          >
            cl
          </label>
          <div className="w-1/6 text-center">
            <button
              type="button"
              onClick={handleAdd}
              className="bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 text-white p-2 rounded text-xl"
            >
              <BsPlusCircleFill />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemAdd;
