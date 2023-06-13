import { FormEvent, useRef } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select";

export function NoteForm(){
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    function handleSubmit(e:FormEvent){
        e.preventDefault()
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
                            <CreatableSelect isMulti></CreatableSelect>
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