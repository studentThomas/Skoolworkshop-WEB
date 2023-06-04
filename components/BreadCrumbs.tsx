import React from "react";
import Link from "next/link";


export default function BreadCrumbs({ breadCrumbs }: any) {
  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb breadcrumb-chevron p-1 rounded-3">
          {breadCrumbs.map((breadCrumb: any, index: number) => (
            <li
              className={`breadcrumb-item ${index === breadCrumbs.length - 1 ? 'active' : ''}`}
              aria-current={index === breadCrumbs.length - 1 ? 'page' : undefined}
              key={index}
            >
              {index === breadCrumbs.length - 1 ? (
                breadCrumb.name
              ) : (
                <Link href={breadCrumb.url} className="link-body-emphasis fw-semibold text-decoration-none">
                  {breadCrumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
