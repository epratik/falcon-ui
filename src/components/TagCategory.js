import React from "react";
import tags from "../data/tags.json";

const TagCategory = () => {
    const [cat, setCat] = useState('');
    
  return (
    <div>
      <div
        className="btn-toolbar"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        {tags.tags.map((item) => {
          return (
            <button
              key={Math.random().toString(36).substr(2, 9)}
              type="button"
              onClick={() => onTagChange(item)}
              className="btn btn-light  btn-outline-primary ms-1 mt-1"
            >
              #{item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TagCategory;
