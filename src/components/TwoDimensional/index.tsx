import React, { useEffect, useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import styled from '@emotion/styled';

type ElementProp = {
  value:string,
}
type ContainerProp = {
  children?: React.ReactNode,
}
type IndexProp = {
  oldIndex:number,
  newIndex:number,
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  row-gap: 30px;
`;
const Item = styled.div`
  width: 48%;
  height: 150px;
  background-color:#eee;
  border: 1px solid #333;
`;

const Data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

const SortableItem = SortableElement<ElementProp>(({value}:ElementProp) => <Item>{value}</Item>);

const SortableList = SortableContainer<ContainerProp>(({children}: ContainerProp) => {
  return <Wrapper>{children}</Wrapper>;
});

function Demo() {
  const [data, setData] = useState<string[] | []>([]);

  const onSortEnd = ({oldIndex, newIndex}:IndexProp) => {
    const newData = arrayMoveImmutable(data, oldIndex, newIndex)
    setData(newData)
    console.log(newData);
  };

  useEffect(() => {
    setData(Data);
  }, [])

  return (
    <SortableList onSortEnd={onSortEnd} axis="xy">
      {data.length>0 && data.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </SortableList>
  );
}

export default Demo;