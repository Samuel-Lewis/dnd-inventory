import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { z } from "zod";

import { Button, Paper, Stack, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

import { inventoryConnection } from "~/api/firebase/firestore/inventory";
import { itemConnection } from "~/api/firebase/firestore/item";
import { useLocalUser } from "~/hooks/useLocalUser";

const schema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

const InventoryCreatePage: React.FC = () => {
  const { isError, isLoading, localUser } = useLocalUser();
  const [formSubmitting, setFormSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: "",
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
      const sword = await itemConnection.create({
        name: "Sword",
        weight: 0,
        description: "A sword",
        category: "martial-melee-weapons",
        value: 10,
        owner: localUser.ref,
        srdRefSlug: "longsword",
        visibility: "public",
      });

      inventoryConnection
        .create({
          ...values,
          items: [{ ref: sword, quantity: 1 }],
          owner: localUser.ref,
          members: [localUser.ref],
        })
        .then((doc) => router.push(`/inventory/${doc.id}`))
        .finally(() => setFormSubmitting(false));
    },
    [isError, isLoading, localUser, router]
  );

  return (
    <div>
      <h1>InventoryCreatePage</h1>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Stack>
          <TextInput
            disabled={formSubmitting}
            label="Inventory name"
            description="Can be changed later"
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            disabled={formSubmitting}
            label="Description"
            {...form.getInputProps("description")}
          />

          <Button loading={formSubmitting} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>No perms, redirects to signup?</li>
          <li>Form to create inventory</li>
          <li>Optional to immediately add items</li>
        </ul>
      </Paper>
    </div>
  );
};

export default InventoryCreatePage;
