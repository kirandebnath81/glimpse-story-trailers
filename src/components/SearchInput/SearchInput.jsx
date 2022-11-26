import React, { useState } from "react";

//icons
import { VscChromeClose } from "react-icons/vsc";
import { AiOutlineSearch } from "react-icons/ai";

//toast
import { toast } from "react-toastify";

//styles
import { StyledForm, StyledInput } from "./SearchInput.styles";

//router
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("");

  const changeHandler = (e) => {
    const { value } = e.target;
    setInputText(value);
  };

  //search
  const searchHandler = () => {
    if (inputText === "") {
      toast.error("Please enter movie name", { theme: "colored" });
      return;
    }
    navigate(`/search/${inputText}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    searchHandler();
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <StyledInput
        type="text"
        value={inputText}
        onChange={(e) => changeHandler(e)}
        placeholder="Search"
      />
      {inputText && (
        <div
          className="search__icon search__icon--cross"
          onClick={() => setInputText("")}
        >
          <VscChromeClose />
        </div>
      )}
      <div
        className="search__icon search__icon--search"
        onClick={searchHandler}
        data-info="Search"
      >
        <AiOutlineSearch />
      </div>
    </StyledForm>
  );
};

export default SearchInput;
