import React from 'react'
import { useState, useEffect } from "react";
import Autosuggest from 'react-autosuggest';
import { getLists } from '../service/ListService.js';
import theme from '../css/AutoSuggest.scss'

const AutoSuggest = (props) => {
    
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [listNames, setListNames] = useState([]);
  
    useEffect(() => {
        getLists().then((res) => {
            setListNames(Array.from(res, item => item.name));
        })
    }, []);

    // Teach Autosuggest how to calculate suggestions for any given input value.
    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        
        if (props.setParentValue)
            props.setParentValue(value);

        return inputLength === 0 ? [] : listNames.filter(val =>
            val.toLowerCase().includes(inputValue)
        );
    };

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    const getSuggestionValue = (suggestion) => {
        props.setParentValue(suggestion);
        return suggestion;
    }

    // render suggestions.
    const renderSuggestion = suggestion => (
        <div>
            {suggestion}
        </div>
    );

    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: props.placeholder,
        value,
        onChange: onChange
    };
    
    return (
        <Autosuggest 
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    )
}

export default AutoSuggest
