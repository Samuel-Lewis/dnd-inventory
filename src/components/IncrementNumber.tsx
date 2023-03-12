import debounce from "lodash.debounce";
import React, { useCallback, useRef, useState } from "react";

import {
  ActionIcon,
  createStyles,
  Group,
  NumberInput,
  NumberInputHandlers,
  Text,
  NumberInputProps,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import { IconCircleMinus, IconCirclePlus, IconTrash } from "@tabler/icons";

export type IncrementNumberProps = NumberInputProps & {
  confirmMessage?: React.ReactNode;
};

const useStyles = createStyles(() => ({
  numberInput: {
    input: {
      width: 64,
      textAlign: "center",
    },
  },
}));

export const IncrementNumber: React.FC<IncrementNumberProps> = ({
  confirmMessage = "Are you sure you want to remove this item?",
  ...props
}) => {
  const handlers = useRef<NumberInputHandlers>();
  const { classes } = useStyles();
  const [isLast, setIsLast] = useState(false);
  const modals = useModals();
  const step = props.step ?? 1;

  const realOnChange = debounce(props.onChange ?? (() => null), 500);

  const onChange = useCallback(
    (value: number) => {
      const checkIsLast =
        value - step <= (props.min ?? Number.MIN_SAFE_INTEGER);
      setIsLast(checkIsLast);
      realOnChange(value);
    },
    [props.min, realOnChange, step]
  );

  const handleDecrement = () => {
    if (handlers.current) {
      handlers.current.decrement();
    }
  };

  const handleIncrement = () => {
    if (handlers.current) {
      handlers.current.increment();
    }
  };

  const promptRemove = () => {
    modals.openConfirmModal({
      onConfirm: handleDecrement,
      title: "Remove item?",
      children: <Text size="sm">{confirmMessage}</Text>,
      labels: { confirm: "Confirm", cancel: "Cancel" },
    });
  };

  return (
    <Group spacing={0}>
      {!isLast ? (
        <ActionIcon size="xl" variant="subtle" onClick={handleDecrement}>
          <IconCircleMinus />
        </ActionIcon>
      ) : (
        <ActionIcon
          size="xl"
          variant="subtle"
          color="red"
          onClick={promptRemove}
        >
          <IconTrash />
        </ActionIcon>
      )}

      <NumberInput
        size="md"
        {...props}
        onChange={onChange}
        hideControls
        handlersRef={handlers}
        className={classes.numberInput}
      />

      <ActionIcon
        size="xl"
        variant="subtle"
        disabled={(props.value ?? 0) >= (props.max ?? Number.MAX_SAFE_INTEGER)}
        onClick={handleIncrement}
      >
        <IconCirclePlus />
      </ActionIcon>
    </Group>
  );
};
