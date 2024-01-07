"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

//shadcn ui
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  searchValue: string;
};

const SearchContainer = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<{ username: string; profile: string }[]>();

  async function search(e: any) {
    if (e.preventDefault) {
      e?.preventDefault();
    }

    const value = e.target.search.value.toLowerCase();
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/searchUsers?username=${value}`
    );

    const data = await res.json();

    setUsers(data);

    setLoading(false);
  }

  useEffect(() => {
    if (props.searchValue === "") {
      return;
    }

    search({ target: { search: { value: props.searchValue } } });
  }, []);

  return (
    <div className="">
      <form
        onSubmit={(e) => search(e)}
        className="mt-5 flex w-full  items-center space-x-2"
      >
        <Input
          disabled={loading}
          type="text"
          name="search"
          placeholder="Search..."
          defaultValue={props.searchValue || ""}
        />
        <Button disabled={loading} type="submit">
          Search
        </Button>
      </form>
      <div className="posts">
        {users?.map((user) => {
          return (
            <Card key={user.username} className="mt-6">
              <CardContent className="p-3">
                <Link
                  href={`/${user.username}`}
                  className="user flex items-center gap-7 cursor-pointer"
                >
                  <div className="image relative h-[10vh] w-[10%] object-cover cursor-pointer rounded-full overflow-hidden">
                    <Image
                      src={
                        user.profile === ""
                          ? "/default_icons/profileImg.png"
                          : user.profile
                      }
                      alt="asd"
                      fill={true}
                      objectFit="cover"
                      priority
                    />
                  </div>
                  <div className="username">
                    <h6>{user.username}</h6>
                  </div>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SearchContainer;