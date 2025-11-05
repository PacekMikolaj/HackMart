import React from "react";
import { useTranslation } from "react-i18next";
import { FormControl, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import ReactCountryFlag from "react-country-flag";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl variant="standard">
      <Select
        labelId="lang-select-label"
        id="lang-select"
        value={currentLang}
        onChange={handleChange}
        sx={{ minWidth: 70, paddingLeft: "10px" }}
      >
        <MenuItem value="pl">
          <ReactCountryFlag
            countryCode="PL"
            svg
            style={{
              width: "1.5em",
              height: "1.5em",
              marginRight: "8px",
            }}
          />
          PL
        </MenuItem>
        <MenuItem value="en">
          <ReactCountryFlag
            countryCode="GB"
            svg
            style={{
              width: "1.5em",
              height: "1.5em",
              marginRight: "8px",
            }}
          />
          EN
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
