import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { z } from "zod";

import {
  Button,
  Group,
  NumberInput,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

import { itemConnection } from "~/api/firebase/firestore/item";
import { Item } from "~/api/models/Item";
import { FancyPaper } from "~/components/FancyPaper";
import { CategorySelect, RaritySelect } from "~/components/form-traits";
import { useLocalUser } from "~/hooks/useLocalUser";

type EditableForm = Pick<
  Item,
  "category" | "name" | "description" | "value" | "weight" | "rarity"
>;

const schema = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string().optional(),
  rarity: z.string().optional(),
  value: z.number().nonnegative().optional(),
  weight: z.number().nonnegative().optional(),
});

const ItemCreatePage: React.FC = () => {
  const { isError, isLoading, localUser } = useLocalUser();
  const [formSubmitting, setFormSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<EditableForm>({
    validate: zodResolver(schema),
    initialValues: {
      name: "",
      category: "adventuring-gear",
      rarity: "common",
      description: "",
    },
  });
  type FormValues = typeof form.values;

  const handleFormSubmit = useCallback(
    async (values: FormValues) => {
      if (isError || isLoading || !localUser) {
        return;
      }
      setFormSubmitting(true);

      itemConnection
        .create({
          ...values,
          ownerRef: localUser.ref,
          srd: false,
          visibility: "public",
        })
        .then((response) => {
          router.push(`/item/${response.id}`);
        })
        .finally(() => setFormSubmitting(false));
    },
    [isError, isLoading, localUser, router]
  );

  return (
    <Stack sx={{ height: "100%" }}>
      <Title order={2}>New Item</Title>
      <FancyPaper rarity={form.values.rarity} sx={{ height: "100%" }}>
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack>
            <TextInput
              disabled={formSubmitting}
              label="Name"
              required
              {...form.getInputProps("name")}
            />

            <CategorySelect
              label="Category"
              required
              {...form.getInputProps("category")}
            />

            <Group grow>
              <RaritySelect label="Rarity" {...form.getInputProps("rarity")} />
              <NumberInput
                label="Value (cp)"
                {...form.getInputProps("value")}
              />
              <NumberInput
                label="Weight (lbs)"
                {...form.getInputProps("weight")}
              />
            </Group>

            <Textarea
              disabled={formSubmitting}
              label="Description"
              {...form.getInputProps("description")}
            />
            <Button loading={formSubmitting} type="submit">
              Create
            </Button>
          </Stack>
        </form>
      </FancyPaper>
    </Stack>
  );
};

export default ItemCreatePage;
