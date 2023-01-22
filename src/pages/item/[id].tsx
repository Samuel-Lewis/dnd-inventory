import React from "react";

import { Paper, Title } from "@mantine/core";

const ItemIdPage: React.FC = () => {
  console.log("item id");
  return (
    <div>
      <h1>ItemIdPage</h1>
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>
            No perms
            <ul>
              <li>public/member/owner: Public view of item</li>
              <li>
                public/member/owner: Button to add to inventory, prompts signup
                if not logged in
              </li>
              <li>protected/private: Doesnt exist</li>
            </ul>
          </li>
          <li>Owner: Edit fields</li>
        </ul>
      </Paper>
    </div>
  );
};

export default ItemIdPage;
