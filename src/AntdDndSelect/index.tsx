import {
	Droppable,
	DragDropContext,
	DropResult,
	Draggable,
	DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';
import { Select, SelectProps } from 'antd';
import React, { CSSProperties, useState } from 'react';
import { LabeledValue, SelectValue } from 'antd/es/select';
import TagItem from './TagItem';

const getItemStyle = (
	isDragging: boolean,
	draggableStyle: DraggableProvidedDraggableProps['style'],
): CSSProperties => ({
	userSelect: 'none',
	opacity: isDragging ? 0.5 : 1,
	...draggableStyle,
});

const reorder = (list: SelectValue, startIndex: number, endIndex: number) => {
	const result = Array.from(list as any[]);
	[result[endIndex], result[startIndex]] = [result[startIndex], result[endIndex]]
	return result;
};

const useControllableValue = (props) => {
	const [value, onChange] = useState(props.defaultValue);
	return [props.value ?? value, props.onChange ?? onChange];
}

const AntdDndSelect = ({
	tagRender,
	...props
}: SelectProps & { onChange: (value: SelectValue) => void }) => {

	const [value, onChange] = useControllableValue(props);

	const onDragEnd = (result: DropResult) => {
		const {
			destination,
			source: { index: dragIndex },
		} = result;

		if (destination) {
			const items = reorder(value, dragIndex, destination.index);
			onChange?.(items);
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="list" direction="horizontal">
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						<Select
							mode='multiple'
							style={{ width: '100%' }}
							tagRender={(props) => (
								<Draggable
									key={props.value}
									draggableId={props.value}
									index={value?.findIndex((item: SelectValue) =>
										props.labelInValue ? (item as LabeledValue).value === props.value : item === props.value,
									)}
								>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
											onMouseDown={(e) => {
												e.stopPropagation();
											}}
										>
											{tagRender ? tagRender(props) : <TagItem {...props} />}
										</div>
									)}
								</Draggable>
							)}
							onChange={onChange}
							value={value}
							{...props}
						/>
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default AntdDndSelect;
