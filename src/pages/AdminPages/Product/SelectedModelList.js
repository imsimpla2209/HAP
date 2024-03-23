import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import { getUnits } from 'features/unit/unitsSlice';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrencyVND } from 'utils/formator';

const SelectedModelList = ({
  data,
  onDelete,
  onEdit,
}) => {
  const unitsState = useSelector((state) => state.unit.units);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!unitsState.length) {
      dispatch(getUnits())
    }
  }, [])

  const columns = [
    {
      title: 'Mẫu',
      dataIndex: 'modelName',
      key: 'modelName',
      render: (text) => <>{text}</>,
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unitId',
      key: 'unitId',
      render: (text) => <>{unitsState?.find((u) => u.unitId === text)?.unitName || text}</>,
    },
    {
      title: 'Thông số',
      dataIndex: 'specification',
      key: 'specification',
      render: (text) => <div style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: text }}></div>
    },
    {
      title: 'Giá Bán Lẻ',
      dataIndex: 'primaryPrice',
      key: 'primaryPrice',
      render: (text) => <>{formatCurrencyVND(text)}</>,
    },
    {
      title: 'Giá Bán Buôn',
      dataIndex: 'secondaryPrice',
      key: 'secondaryPrice',
      render: (text) => <>{formatCurrencyVND(text)}</>,
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: '',
      dataIndex: 'key',
      key: 'action',
      render: (text) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditTwoTone twoToneColor={'#2954e3'} />}
            onClick={() => onEdit(text)}
          />
          <Button
            type="text"
            icon={<DeleteTwoTone twoToneColor={'#e62e4d'} />}
            onClick={() => onDelete(text)}
          />
        </Space>
      ),
    },
  ];
  return (<Table columns={columns} dataSource={data?.map((m, index) => ({ ...m, key: index }))} rowKey={() => Math.floor(Math.random() * 100) + 1?.toString()} />)
};

export { SelectedModelList };
