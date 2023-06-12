import React, { useContext, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useQuery } from "@apollo/client";

import { MessageContext } from "../context/messageContext";

import { GET_ALL_ADMINS } from "../graphql/queries";

const RecipientPicker = () => {
  const { data, loading, error } = useQuery(GET_ALL_ADMINS);
  const { recipient, addRecipient } = useContext(MessageContext);

  const options = data?.getAllAdmins?.map((admin) => ({
    id: admin.id,
    fullname: admin.fullname,
    label: admin.fullname,
  }));

  const handleOnChange = (e) => {
    addRecipient(options.find((option) => option.id === e.target.value));
  };

  useEffect(() => {
    // when get all admins finishes, set the first admin as the recipient
    if (options?.length > 0 && !recipient.id) {
      addRecipient(options[0]);
    }
  }, [options, recipient, addRecipient]);

  if (loading) return <div>loading...</div>;

  if (error) return <div>Error {error}</div>;

  return (
    <FormControl sx={{ minWidth: "200px", margin: "10px" }}>
      <InputLabel id="recipient-input-label">Choose Recipient</InputLabel>
      <Select
        labelId="recipient-input-label"
        id="recipient-input"
        value={recipient.id || options[0]?.id || ""}
        label="Choose recipient"
        onChange={handleOnChange}
      >
        {options?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RecipientPicker;
