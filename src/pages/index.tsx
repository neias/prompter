import React, { useEffect, useState } from "react";
import { Link, type HeadFC, type PageProps, navigate } from "gatsby";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const IndexPage: React.FC<PageProps> = () => {
  const [contentList, setContentList] = useState<string[]>([]);

  useEffect(() => {
    const storedContent =
      JSON.parse(localStorage.getItem("editorContent")) || [];
    setContentList(storedContent);
  }, []);

  const handleItemClick = (content) => {
    localStorage.setItem("selectedContent", JSON.stringify(content));
    navigate("/show");
  };

  return (
    <div className="overflow-hidden rounded-md bg-white shadow px-5 py-4">
      <h2 className="text-2xl font-bold tracking-tight text-gray-600 sm:text-2xl">
        Metinlerim
      </h2>
      <Input type="search" />
      <div>list, card </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card key={0}>
          <CardContent className="flex flex-col items-center justify-center h-full text-center">
            <p>+</p>
            <p>
              <Link to="/new">Yeni Metin</Link>
            </p>
          </CardContent>
        </Card>
        {contentList.map((content, index) => (
          <Card key={index} onClick={() => handleItemClick(content)}>
            <CardContent>
              <p
                className="truncate overflow-hidden text-ellipsis whitespace-nowrap"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
