import React from 'react'
import { Row, AutoComplete, Tag, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

const options = [
    { value: 'tag1', label: 'Light' },
    { value: 'tag2', label: 'Bamboo' },
];

const Tags = ({ el,addNewTag,addNewTag2,defUse,tagInput }) => {
    return (
        <Row style={{ textAlign: 'center', margin: '2px' }}>
            {el.tags}
            {el.tagInput ?
                // <Input onChange={e => tagNameChange(e, el.id)}
                //     onPressEnter={e => addNewTag(e, el.id)
                //     }></Input> :

                <AutoComplete
                    // value={value}
                    options={options}
                    style={{ width: 200 }}
                    onSelect={e => addNewTag(e, el.id)}
                    // onPressEnter={e => addNewTag(e, el.id)}
                    // onSearch={e => addNewTag(e, el.id)}
                    // on={e => addNewTag(e, el.id)}
                    onChange={defUse}

                    placeholder="control mode"
                ><Search onPressEnter={e => addNewTag2(e, el.id)} onSearch={e => addNewTag(e, el.id)}></Search></AutoComplete> :
                < Tag className="site-tag-plus" onClick={() => tagInput(el.id, true)}>
                    <PlusOutlined /> New Tag
                                            </Tag>}
        </Row>
    )
}

export default Tags