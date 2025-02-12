import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Button } from "@/components/ui/button";
  import { Label } from "@/components/ui/label";
  import { useForm, Controller } from "react-hook-form";
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
  import { Plus, SquarePen, Trash2 } from "lucide-react";

interface FormField {
    fieldName: string;
    fieldTitle: string;
    fieldType:
      | "text"
      | "email"
      | "password"
      | "number"
      | "textarea"
      | "select"
      | "checkbox"
      | "file"
      | "radio";
    placeholder?: string;
    required: boolean;
    options?: string | string[];
  }

  interface FormDetails {
    formTitle: string;
    formHeading?: string;
    formFields: FormField[];
  }

interface DynamicFormProps {
    formDetails: FormDetails;
    isEditable: boolean;
    // onSubmit: (data: SubmissionData) => void; 
    onAddField?: () => void;
    onUpdateField?: (field: FormField) => void;
    onDeleteField?: (fieldName: string) => void;
  }

export default function DynamicForm({
    formDetails,
    isEditable,
    // onSubmit,
    onAddField,
    onUpdateField,
    onDeleteField,
  }: DynamicFormProps) {

      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [selectedField, setSelectedField] = useState<FormField | null>(null);
      const [dialogType, setDialogType] = useState<"update" | "delete">("update");
      const [isAddFieldDialogOpen, setIsAddFieldDialogOpen] = useState(false);
      const [newField, setNewField] = useState<Partial<FormField>>({
        fieldType: "text",
        required: false,
      });
    
      const reactForm = useForm<Record<string, string | number | boolean | File>>({
        defaultValues: { formTitle: "", formHeading: "" },
      });

      const handleAddField = () => {
        if (onAddField) {
          onAddField();
        }
        setIsAddFieldDialogOpen(false)
      };
  
      const handleUpdateField = (updatedField: FormField) => {
        if (onUpdateField) {
          onUpdateField(updatedField);
        }
        setIsDialogOpen(false);
      };
  
      const handleDeleteField = () => {
        if (onDeleteField && selectedField) {
          onDeleteField(selectedField.fieldName);
        }
        setIsDialogOpen(false);
      };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center">
        {formDetails.formTitle}
      </h2>
      <p className="text-white/50 text-center text-sm">
        {formDetails.formHeading}
      </p>
      <form
        onSubmit={reactForm.handleSubmit((data) =>
          console.log("Form Submitted:", data)
        )}
        className="space-y-4 mt-4"
      >
        {formDetails.formFields.map((field) => (
          <div key={field.fieldName} className="relative flex flex-col gap-2">
            <Label htmlFor={field.fieldName}>{field.fieldTitle}</Label>
            {field.fieldType === "text" ||
            field.fieldType === "email" ||
            field.fieldType === "password" ||
            field.fieldType === "number" ? (
              <Input
                id={field.fieldName}
                type={field.fieldType}
                placeholder={field.placeholder}
                {...reactForm.register(field.fieldName, {
                  required: field.required,
                })}
                required={field.required}
              />
            ) : field.fieldType === "textarea" ? (
              <Textarea
                id={field.fieldName}
                placeholder={field.placeholder}
                {...reactForm.register(field.fieldName, {
                  required: field.required,
                })}
                required={field.required}
              />
            ) : field.fieldType === "select" ? (
              <Controller
                control={reactForm.control}
                name={field.fieldName}
                rules={{ required: field.required }}
                render={({ field: selectField }) => (
                  <Select
                    onValueChange={selectField.onChange}
                    value={String(selectField.value)}
                    required={field.required}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(field.options) && 
                        field.options.map(
                          (
                            option: string 
                          ) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          )
                        )}
                    </SelectContent>
                  </Select>
                )}
              />
            ) : field.fieldType === "checkbox" ? (
              <Controller
                control={reactForm.control}
                name={field.fieldName}
                rules={{ required: field.required }}
                render={({ field: checkboxField }) => (
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id={field.fieldName}
                      checked={Boolean(checkboxField.value)}
                      onCheckedChange={checkboxField.onChange}
                      required={field.required}
                    />
                    <Label htmlFor={field.fieldName}>
                      {field.options?.[0] ?? "Accept Terms"}
                    </Label>
                  </div>
                )}
              />
            ) : field.fieldType === "radio" ? (
              <Controller
                control={reactForm.control}
                name={field.fieldName}
                rules={{ required: field.required }}
                render={({ field: radioField }) => (
                  <RadioGroup
                    value={String(radioField.value)}
                    onValueChange={radioField.onChange}
                    className="flex flex-col gap-2"
                  >
                    {Array.isArray(field.options) && 
                      field.options.map((option: string) => (
                        <div key={option} className="flex items-center gap-2">
                          <RadioGroupItem
                            value={option}
                            id={`${field.fieldName}-${option}`}
                            required={field.required}
                          />
                          <Label htmlFor={`${field.fieldName}-${option}`}>
                            {option}
                          </Label>
                        </div>
                      ))}
                  </RadioGroup>
                )}
              />
            ) : field.fieldType === "file" ? (
              <Controller
                control={reactForm.control}
                name={field.fieldName}
                rules={{ required: field.required }}
                render={({ field: fileField }) => (
                  <Input
                    className="w-full py-1.5 border-2 border-dashed  cursor-pointer file:hidden"
                    id={field.fieldName}
                    type="file"
                    accept="image/*, .pdf, .docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        fileField.onChange(file);
                      }
                    }}
                    required={field.required}
                  />
                )}
              />
            ) : null}
            {isEditable &&
            <div className="absolute -right-16 top-7 flex gap-2">
              <SquarePen
                className="text-zinc-600"
                onClick={() => {
                  setSelectedField(field);
                  setDialogType("update");
                  setIsDialogOpen(true);
                }}
              />
              <Trash2
                className="text-red-600"
                onClick={() => {
                  setSelectedField(field);
                  setDialogType("delete");
                  setIsDialogOpen(true);
                }}
              />
            </div>}
            {/* {reactForm.formState.errors[field.fieldName] && (
              <p className="text-red-500 text-sm">This field is required.</p>
            )} */}
          </div>
        ))}
        {isEditable && 
        <Button
        type="button"
        variant="outline"
                className=" w-full"
                onClick={() => {
                  setIsAddFieldDialogOpen(true);
                }}
        >
          <Plus/>
          Add more fields</Button>}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
      {isEditable &&
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "update" ? "Update Field" : "Delete Field"}
            </DialogTitle>
            <DialogDescription>
              {dialogType === "update"
                ? "Update the field details below."
                : "Are you sure you want to delete this field?"}
            </DialogDescription>
          </DialogHeader>
          {dialogType === "update" && selectedField && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const updatedField = {
                  ...selectedField,
                  fieldTitle: formData.get("fieldTitle") as string,
                  placeholder: formData.get("placeholder") as string,
                };
                handleUpdateField(updatedField);
              }}
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fieldTitle">Field Title</Label>
                  <Input
                    id="fieldTitle"
                    name="fieldTitle"
                    defaultValue={selectedField.fieldTitle}
                  />
                </div>
                <div>
                  <Label htmlFor="placeholder">Placeholder</Label>
                  <Input
                    id="placeholder"
                    name="placeholder"
                    defaultValue={selectedField.placeholder}
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
          {dialogType === "delete" && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteField}>
                Confirm Delete
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>}
      {isEditable && 
      <Dialog open={isAddFieldDialogOpen} onOpenChange={setIsAddFieldDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Field</DialogTitle>
            <DialogDescription>
              Enter the details of the new field.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fieldTitle">Field Title</Label>
              <Input
                id="fieldTitle"
                value={newField.fieldTitle || ""}
                onChange={(e) =>
                  setNewField((prev) => ({
                    ...prev,
                    fieldTitle: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <Label htmlFor="fieldType">Field Type</Label>
              <Select
                value={newField.fieldType || "text"}
                onValueChange={(value) =>
                  setNewField((prev) => ({
                    ...prev,
                    fieldType: value as FormField["fieldType"],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="textarea">Textarea</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="file">File</SelectItem>
                  <SelectItem value="radio">Radio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(newField.fieldType === "select" ||
              newField.fieldType === "radio") && (
              <div>
                <Label htmlFor="options">Options (comma-separated)</Label>
                <Input
                  id="options"
                  value={
                    typeof newField.options === "string" ? newField.options : ""
                  }
                  onChange={(e) =>
                    setNewField((prev) => ({
                      ...prev,
                      options: e.target.value, 
                    }))
                  }
                />
              </div>
            )}

            <div>
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={newField.placeholder || ""}
                onChange={(e) =>
                  setNewField((prev) => ({
                    ...prev,
                    placeholder: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="required"
                checked={Boolean(newField.required)}
                onCheckedChange={(checked) =>
                  setNewField((prev) => ({
                    ...prev,
                    required: Boolean(checked),
                  }))
                }
              />
              <Label htmlFor="required">Required</Label>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAddField}>Add Field</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>}
    </div>
  )
}
