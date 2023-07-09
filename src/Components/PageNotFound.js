import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div>
        <h1 className="text-warning">Oops!! Error 4O4..</h1>
        <h1>Page Not Found......</h1>
        <h2>
          <Link to={"/"}>Go back to homepage--&gt;</Link>
        </h2>
    </div>
  );
}
