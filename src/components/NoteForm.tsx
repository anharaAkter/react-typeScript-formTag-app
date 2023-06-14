import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select";
import { NoteData, Tag } from "../App";

type NoteFormProps = {
    onSubmit : (data: NoteData)=>void
}

export function NoteForm({onSubmit}:NoteFormProps){
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags,setSelectedTags] = useState<Tag[]>([])
    function handleSubmit(e:FormEvent){
        e.preventDefault()
        onSubmit({
            title : titleRef.current!.value,
            markdown : markdownRef.current!.value,
            tags : [],

        })
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <Stack >
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required ref={titleRef}/>

                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>tags</Form.Label>
                            <CreatableSelect value={selectedTags.map(tag =>{
                                    return {label : tag.label, value : tag.id}
                            })}
                            onChange={onChangetags => {
                                setSelectedTags(onChangetags.map(tag=>{
                                    return {
                                        label : tag.label,
                                        id : tag.value,
                                    }
                                }))
                                
                            }} isMulti />
                            <Form.Select  />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group controlId="markdown">
                                <Form.Label>Body</Form.Label>
                                <Form.Control required as="textarea" ref={markdownRef} rows={15}/>
                    </Form.Group>
                    <Stack direction="horizontal" gap={4} className="justify-content-end">

                        <Button type="submit" variant="primary"> Submit</Button>
                        <Link to={".."}>
                            <Button type="button" variant="outline-secondary"> Cancel</Button>
                        </Link>
                    </Stack>
                </Row>
                    
                
            </Stack>
        </Form>
    )
}