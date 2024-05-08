"use client";

import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EditDesignSchema, EditDesignSchemaType } from "@/lib/schemas/edit-design.schema";
import { updateDesignMetadata } from "@/lib/actions/design.actions";
import { editMetadataModal } from "@/hooks/useModal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface EditDesignFormProps {
  id: string;
  title: string;
  description?: string;
}

const EditDesignForm = ({ id, title, description }: EditDesignFormProps) => {
  const pathname = usePathname();
  const { onClose } = editMetadataModal();

  const form = useForm<EditDesignSchemaType>({
    resolver: zodResolver(EditDesignSchema),
    defaultValues: {
      title: title,
      description: description,
    },
  });

  const onSubmit = async (data: EditDesignSchemaType) => {
    console.log("data :>> ", data);

    const updateDesignResponse = await updateDesignMetadata({ designId: id, path: pathname, ...data });

    if (updateDesignResponse.status) {
      onClose();
    }
  };

  const onInputChange = (value: string, onFieldChange: (value: string) => void) => {
    onFieldChange(value);
    form.clearErrors("root");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 font-semibold">Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="auth-input"
                  placeholder="Add a title..."
                  type="text"
                  onChange={(e) => onInputChange(e.target.value, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 font-semibold">Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="auth-input"
                  placeholder="Give a short description to your design..."
                  rows={3}
                  onChange={(e) => onInputChange(e.target.value, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        <Button className="bg-primary-purple font-semibold float-right !mt-6" type="submit">
          Save changes
        </Button>
      </form>
    </Form>
  );
};

export default EditDesignForm;
