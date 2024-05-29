import { CloseOutlined } from '@ant-design/icons';
import React, { CSSProperties } from 'react';
import { CustomTagProps } from 'rc-select/lib/BaseSelect';

export type TagItemProps = {
  label?: React.ReactNode;
  originLabel?: string;
  style?: CSSProperties;
  dataHandlerId?: string;
  onMouseDown?: React.MouseEventHandler;
} & CustomTagProps;

const TagItem: React.FC<TagItemProps> = ({ label, originLabel, dataHandlerId, onMouseDown, onClose, style }, ref) => (
  <span
    className="ant-select-selection-item"
    title={originLabel as string}
    style={style}
    ref={ref}
    onMouseDown={onMouseDown}
    data-handler-id={dataHandlerId}
  >
    <span className="ant-select-selection-item-content">{label}</span>
    <span className="ant-select-selection-item-remove" unselectable="on" aria-hidden="true">
      <CloseOutlined onClick={onClose} />
    </span>
  </span>
);

export default React.forwardRef(TagItem);
