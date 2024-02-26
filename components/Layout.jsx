import React,{useEffect} from "react";

export const Layout = ({title,children}) => {

    useEffect(() => {
        document.title = title;
      }, [title]);
    
      return (
        <div>
          <h1 className="category-title">{title}</h1>
          {children}
        </div>
      );

};