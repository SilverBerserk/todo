import React, { useState } from 'react'
import { Input, Button, Popover, Radio, Row, Col, Tag, AutoComplete } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

const Main = () => {



    const options = [
        { value: 'tag1', label: 'Light' },
        { value: 'tag2', label: 'Bamboo' },
    ];
    // const options = ['tag1', 'tag2', 'others tags']


    const list = [{ id: '1', text: 'do this', edit: false, done: false, tagInput: false, tags: [] }, { id: '2', text: 'do that', edit: false, done: false, tagInput: false, tags: [] }]
    const [todoList, setList] = useState(list)
    const [text, setText] = useState()
    // const [visible, setVisible] = useState(false)
    const [doneList, setDoneList] = useState(false)
    // const [showInput, setShowInput] = useState(false)
    const [newTag, setNewTag] = useState({ id: -1, text: '' })

    const onAdd = (item) => {
        if (item !== '') {
            const newList = todoList
            const newId = Math.max.apply(null, todoList.map(el => el.id)) + 1
            console.log(newList)
            setList([...newList, { id: newId, text: item, edit: false, done: false }])
        }
    }

    const onEditVisible = (id) => {
        const newList = todoList
        const idx = todoList.findIndex(el => el.id === id)
        newList[idx].edit = true;
        console.log(newList)
        setList([...newList])


    }

    const onEdit = (id) => {
        const newList = todoList
        const idx = todoList.findIndex(el => el.id === id)
        newList[idx].edit = false;
        newList[idx].text = text
        console.log(newList)
        setList([...newList])
    }

    const onChange = (text) => {
        setText(text.target.value)
    }

    const onDelete = (id) => {
        const newList = todoList.filter(el => el.id !== id)
        setList(newList)
    }

    const handleSizeChange = (e) => {
        setDoneList(e.target.value)
    }

    const onDone = (id) => {
        const newList = todoList
        const idx = todoList.findIndex(el => el.id === id)
        newList[idx].done = true;
        console.log(newList)
        setList([...newList])
    }

    const tagInput = (id, value) => {
        const newList = todoList
        const idx = todoList.findIndex(el => el.id === id)
        newList[idx].tagInput = value;
        console.log(newList)
        setList([...newList])
    }

    const tagNameChange = (e, id) => {
        console.log(e.target.value, id)
        setNewTag(id, e.target.value)
    }

    const addNewTag = (e, id) => {
        console.log(e, id)
        const newList = todoList
        // const newId = Math.max.apply(null, todoList[idx].tags.map(el => el.id)) + 1
        const idx = todoList.findIndex(el => el.id === id)
        newList[idx].tags = [...newList[idx].tags, <Tag >{e}</Tag>];
        // console.log(newList)
        setList([...newList])
        // setTag
        tagInput(id, false)
    }


    const addNewTag2 = (e, id) => {
        console.log(e, id)
        const newList = todoList
        // const newId = Math.max.apply(null, todoList[idx].tags.map(el => el.id)) + 1
        const idx = todoList.findIndex(el => el.id === id)
        newList[idx].tags = [...newList[idx].tags, <Tag >{e.target.value}</Tag>];
        // console.log(newList)
        setList([...newList])
        // setTag
        tagInput(id, false)
    }

    const defUse = () => { }

    return (
        <React.Fragment >
            <Col style={{ padding: '20px', maxWidth: '400px' }} >
                <Row>
                    <Radio.Group onChange={handleSizeChange} style={{ width:'400px' }}>
                        <Radio.Button value={true}>Done</Radio.Button>
                        <Radio.Button value={false}>NotDone</Radio.Button>
                    </Radio.Group>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            {!doneList ? todoList.filter(e => e.done === doneList).map(el =>
                                el.edit === false ?
                                    <span key={el.id}>
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
                                                // on
                                                // onPressEnter={e => addNewTag(e, el.id)}
                                                // onSearch={e => addNewTag(e, el.id)}
                                                // on={e => addNewTag(e, el.id)}
                                                onChange={defUse}

                                                placeholder="control mode"
                                            ><Search onPressEnter={e => addNewTag2(e, el.id)} onSearch={e => addNewTag(e, el.id)}></Search></AutoComplete> :
                                            < Tag className="site-tag-plus" onClick={() => tagInput(el.id, true)}>
                                                <PlusOutlined /> New Tag
                                            </Tag>}

                                        <li onClick={() => onDone(el.id)}>

                                            {el.text}
                                        </li>
                                        <Button onClick={() => onEditVisible(el.id)}>edit</Button>
                                        <Button onClick={() => onDelete(el.id)}>delete</Button>

                                    </span>
                                    :
                                    <span key={el.id}>
                                        <Input placeholder={el.text} onChange={onChange} />
                                        <Button onClick={() => onEdit(el.id)}>edit</Button>
                                        <Button onClick={() => onDelete(el.id)}>delete</Button>
                                    </span>)
                                :
                                todoList.filter(e => e.done === doneList).map(el =>
                                    <li key={el.id} >{el.text}</li>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Search onSearch={onAdd} />
                </Row>
            </Col>
        </React.Fragment >
    )
}

export default Main