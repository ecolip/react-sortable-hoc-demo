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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  overflow: auto;
  margin-left: -10px;
  margin-right: -10px;
`;
const ItemWrapper = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  margin-bottom: 20px;
`;
const Item = styled.div`
  width: 100%;
  height: 180px;
  background-color: #eee;
  border: 1px solid #333;
`;

const Data = [
'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10',
'Item 11', 'Item 12', 'Item 13', 'Item 14',
];

const SortableItem = SortableElement<ElementProp>(({value}:ElementProp) => <ItemWrapper><Item>{value}</Item></ItemWrapper>);

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