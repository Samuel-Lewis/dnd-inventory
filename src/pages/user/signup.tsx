import React, { useCallback } from "react";

import { Button, Paper, Title } from "@mantine/core";

import { RowId } from "~/api/aws/dynamodb/id";
import {
  createInventory,
  deleteInventory,
  readInventory,
  updateInventory,
} from "~/api/aws/dynamodb/inventory";
import { createUser } from "~/api/aws/dynamodb/user";

const SignupPage: React.FC = () => {
  const signUp = useCallback(async () => {
    // const a = await createUser({ username: "dogfart" });
    // console.log(a);

    const rowId = new RowId("usr#QNhEUWFW4Tci");
    // const c = await createInventory(rowId, {
    //   title: "beans",
    //   description: "beans",
    // });

    rowId.addInventory(true, "nZAGUgMVrrb5");
    // const d = await updateInventory(rowId, {
    //   title: "fuggin beans",
    // });

    const g = await readInventory(rowId);
    console.log(g);
  }, []);

  return (
    <div>
      <h1>SignUp Page</h1>
      <Paper withBorder p="sm">
        <Button onClick={signUp} color="blue">
          Sign Up
        </Button>
        <Title order={3}>TODO</Title>
        <ul>
          <li>Add different auth providers</li>
        </ul>
      </Paper>
    </div>
  );
};

export default SignupPage;
