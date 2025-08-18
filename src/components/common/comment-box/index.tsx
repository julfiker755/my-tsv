"use client";
import React, { useState } from "react";
import Avatars from "@/components/reuseable/avater";
import { SmallCicle } from "@/components/reuseable/small-circle";
import { Button, Input } from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useGetProfileQuery } from "@/redux/api/authApi";
import {
  useGetCommentQuery,
  useGetReplayQuery,
  useStoreCommentsMutation,
  useStoreReplayMutation,
  useToggleReactionMutation,
  useToggleReplayReactionMutation,
} from "@/redux/api/landing/commentApi";
import { modifyPayload } from "@/lib";

export default function CommentBox({ id, commentCount }: any) {
  const { data: profileData } = useGetProfileQuery({});
  const [storeComments] = useStoreCommentsMutation();
  const { data } = useGetCommentQuery({ video_id: id });
  const [openReplies, setOpenReplies] = useState<number | null>(null);
  const [openReplyBox, setOpenReplyBox] = useState<number | null>(null);

  const toggleReplies = (id: number) => {
    setOpenReplies(openReplies === id ? null : id);
  };

  const toggleReplyBox = (id: number) => {
    setOpenReplyBox(openReplyBox === id ? null : id);
  };

  return (
    <div className="border-gray-200">
      <h2 className="text-lg font-semibold">{commentCount} Comments</h2>
      <div className="flex items-center gap-3 mt-4">
        <Avatars
          src={profileData?.data?.avatar}
          fallback={profileData?.data?.name}
          alt={profileData?.data?.name}
        />
        <Input
          onKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              const target = e.target as HTMLInputElement;
              const value = {
                video_id: id,
                comment: target?.value,
              };
              const data = modifyPayload(value);
              const res = await storeComments(data).unwrap();
              if (res?.status) {
                target.value = "";
              }
            }
          }}
          placeholder={`Comment as ${profileData?.data?.name}`}
          className="flex-1 h-11 rounded-full bg-white"
        />
      </div>
      <div className="mt-6 space-y-6">
        {data?.comments?.data?.map((item: any) => (
          <CommentItem
            key={item.id}
            comment={item}
            isRepliesOpen={openReplies === item.id}
            isReplyBoxOpen={openReplyBox === item.id}
            onToggleReplies={() => toggleReplies(item.id)}
            onToggleReplyBox={() => toggleReplyBox(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

function CommentItem({
  comment,
  isRepliesOpen,
  isReplyBoxOpen,
  onToggleReplies,
  onToggleReplyBox,
}: {
  comment: any;
  isRepliesOpen: boolean;
  isReplyBoxOpen: boolean;
  onToggleReplies: () => void;
  onToggleReplyBox: () => void;
}) {
  const {
    id,
    user,
    comment: text,
    created_at_format,
    is_react,
    reactions_count_format,
  } = comment || {};
  const [toggleReaction, { isLoading }] = useToggleReactionMutation();
  return (
    <div className="flex gap-3">
      <Avatars src={user?.avatar} fallback={user?.name} alt={user.name} />
      <div className="flex-1">
        {/* Name and Time */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold">{user.name}</span>
          <span className="text-gray-500">
            <SmallCicle /> {created_at_format}
          </span>
        </div>

        {/* Comment Text and Like */}
        <div className="flex items-center space-x-8 mt-1">
          <p className="text-gray-800">{text}</p>
          <span className="flex items-center gap-1 text-gray-600">
            <span className="flex items-center gap-1">
              <span
                onClick={async () => {
                  if (!isLoading) {
                    const value = modifyPayload({ comment_id: id });
                    await toggleReaction(value).unwrap();
                  }
                }}
              >
                {is_react ? (
                  <FavIcon name="lovefill" className="size-4 cursor-pointer" />
                ) : (
                  <FavIcon name="love" className="size-4 cursor-pointer" />
                )}
              </span>
              <span className="text-blacks">
                {" "}
                {reactions_count_format == "0" ? "" : reactions_count_format}
              </span>
            </span>
            {comment.likes}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-600/90 flex items-center gap-1"
            onClick={onToggleReplies}
          >
            See Replies
            <ChevronDown
              className={cn(
                "transition-transform duration-200",
                isRepliesOpen ? "rotate-180" : ""
              )}
            />
          </Button>
          <Button
            variant="ghost"
            className="bg-white rounded-full text-blacks/80 hover:bg-white h-6"
            size="sm"
            onClick={onToggleReplyBox}
          >
            Reply
          </Button>
        </div>

        {/* Replies */}
        {isRepliesOpen && <Replies comment_id={id} className="mt-3" />}

        {/* Reply Box */}
        {isReplyBoxOpen && (
          <ReplyBox
            onToggleReplyBox={onToggleReplyBox}
            comment_id={id}
            className="mt-3"
          />
        )}
      </div>
    </div>
  );
}

function Replies({ className, comment_id }: any) {
  const { data } = useGetReplayQuery(
    { comment_id },
    {
      skip: !comment_id,
    }
  );
  const [toggleReplayReaction, { isLoading }] =
    useToggleReplayReactionMutation();

  return (
    <div className="space-y-6">
      {data?.length > 0 ? (
        data?.map(
          ({
            reply,
            user,
            created_at_format,
            id,
            is_react,
            reactions_count_format,
          }: any) => (
            <div key={id} className={cn("flex gap-3", className)}>
              <Avatars
                src={user?.avatar}
                fallback={user?.name}
                alt={user?.name || "Anonymous User"}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">
                    {user?.name || "Anonymous User"}
                  </span>
                  <span className="text-gray-500">
                    <SmallCicle /> {created_at_format}
                  </span>
                </div>
                <div className="flex items-center space-x-8 mt-1">
                  <p className="mt-1 text-gray-800 break-words">{reply}</p>
                  <span className="flex items-center gap-1 text-gray-600">
                    <span className="flex items-center gap-1">
                      <span
                        onClick={async () => {
                          if (!isLoading) {
                            const value = modifyPayload({ reply_id: id });
                            await toggleReplayReaction(value).unwrap();
                          }
                        }}
                      >
                        {is_react ? (
                          <FavIcon
                            name="lovefill"
                            className="size-4 cursor-pointer"
                          />
                        ) : (
                          <FavIcon
                            name="love"
                            className="size-4 cursor-pointer"
                          />
                        )}
                      </span>
                      <span className="text-blacks">
                        {reactions_count_format == "0"
                          ? ""
                          : reactions_count_format}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )
        )
      ) : (
        <p className="text-sm text-gray-500">No replies yet</p>
      )}
    </div>
  );
}

function ReplyBox({ comment_id, className, onToggleReplyBox }: any) {
  const [isText, setIsText] = useState("");
  const { data: profileData } = useGetProfileQuery({});
  const [storeReplay] = useStoreReplayMutation();

  const hanldeReplay = async () => {
    if (!isText.trim()) return;
    const value = {
      comment_id,
      reply: isText,
    };
    const data = modifyPayload(value);
    const res = await storeReplay(data).unwrap();
    if (res.status) {
      setIsText("");
      onToggleReplyBox?.(); 
    }
  };

  return (
    <div className={cn("flex gap-3", className)}>
      <Avatars
        src={profileData?.data?.avatar}
        fallback={profileData?.data?.name}
        alt={profileData?.data?.name}
      />
      <div className="flex-1">
        <Input
          value={isText}
          onChange={(e) => setIsText(e.target.value)}
          placeholder="Write your reply here..."
          className="border-x-0 flex-1 border-t-0 rounded-none"
        />
        <ul className="flex space-x-1 mt-2 justify-end">
          <li>
            <Button
              variant="ghost"
              className="bg-white rounded-full text-blacks/80 hover:bg-white h-6"
              size="sm"
              onClick={() => {
                setIsText("");
                onToggleReplyBox?.(); 
              }}
            >
              Cancel
            </Button>
          </li>
          <li>
            <Button
              onClick={() => hanldeReplay()}
              variant="ghost"
              className="bg-grays-place hover:bg-grays-place rounded-full text-blacks/80 h-6"
              size="sm"
            >
              Save
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

