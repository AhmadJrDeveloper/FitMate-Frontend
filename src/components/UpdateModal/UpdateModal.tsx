// UpdateModalButton.tsx
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaPen } from "react-icons/fa";
import './UpdateModal.css'
interface Field {
  label: string;
  stateName: string;
  type: "text" | "file" | "textarea" | "select";
  options?: { value: string; label: string }[];
}

interface UpdateModalButtonProps {
  ModalTitle?: string;
  ButtonTitle?: string;
  fields?: Field[];
  onSubmit?: (formData: any, id: string) => Promise<void>;
  initialFormValues?: { [key: string]: string };
}

function UpdateModal({
  ModalTitle,
  fields,
  ButtonTitle,
  onSubmit,
  initialFormValues,
}: UpdateModalButtonProps) {
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>(
    initialFormValues || {}
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleInputChange = (fieldName: string, value: string | File) => {
    setFormValues((prevState) => ({
      ...prevState,
      [fieldName]: value, // No need to cast File to string
    } as { [key: string]: string }));
  };



  const handleUpdateCategory = async () => {
    try {
      if (onSubmit) {
        await onSubmit(formValues, "");
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (onSubmit) {
        const formData = new FormData();
        for (const key in formValues) {
          formData.append(key, formValues[key]);
        }
        await onSubmit(formData, "");
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (initialFormValues) {
      setFormValues(initialFormValues);
    }
  }, [initialFormValues]);

  return (
    <>
      <FaPen className="update-pen" onClick={handleShow}/> 

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ModalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {fields &&
              fields.map((field, index) => (
                <Form.Group
                  key={index}
                  className="mb-3"
                  controlId={`field-${index}`}
                >
                  <Form.Label>{field.label}</Form.Label>
                  {field.type === "select" ? (
                    <Form.Control
                      as="select"
                      value={formValues[field.stateName] || ""}
                      onChange={(e) =>
                        handleInputChange(field.stateName, e.target.value)
                      }
                    >
                      <option value="">
                        Select {field.label.toLowerCase()}
                      </option>
                      {field.options?.map((option:any, index:any) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  ) : field.type === "textarea" ? (
                    <Form.Control
                      as="textarea"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      value={formValues[field.stateName] || ""}
                      onChange={(e) =>
                        handleInputChange(field.stateName, e.target.value)
                      }
                    />
                  ) : field.type === "file" ? (
                    <Form.Control
                      type="file"
                      onChange={(e) =>
                        handleInputChange(
                          field.stateName,
                          (e.target as HTMLInputElement).files?.[0] || ""
                        )
                      }
                    />
                  ) : (
                    <Form.Control
                      type="text"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      value={formValues[field.stateName] || ""}
                      onChange={(e) =>
                        handleInputChange(field.stateName, e.target.value)
                      }
                    />
                  )}
                </Form.Group>
              ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {ModalTitle === 'Update Category' && (
          <Button className="Submit-Button" onClick={handleUpdateCategory}>
            Update
          </Button>
          )}

          {ModalTitle === 'Update Exercise' && (
          <Button className="Submit-Button" onClick={handleUpdate}>
            Update
          </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;
