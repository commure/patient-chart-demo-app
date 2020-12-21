import React, { useState } from "react";
import { InputGroup } from "@commure/components-foundation";
import useDebounce from "../../utils/hooks/useDebounce";
import PatientListLoader from "../PatientListLoader/PatientListLoader";

const PanelBody: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  return (
    <>
      <InputGroup
        className="cm-search-input"
        large
        placeholder="Search patient ..."
        leftIcon="search"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(event.target.value)
        }
      />
      <PatientListLoader searchPatientName={debouncedSearchTerm} />
    </>
  );
};

export default PanelBody;
