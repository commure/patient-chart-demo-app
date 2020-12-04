import React, { useState } from "react";

import { InputGroup } from "@commure/components-foundation";

const PanelBody: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
    </>
  );
};

export default PanelBody;