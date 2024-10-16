import { createSignal, For, Show } from "solid-js";
import { useState } from "../../store";
import ClipsList from "../Clips/List";
import { getDataFromApi } from "../../api/twitch";
import { TwitchApiEndpoints } from "../../store/config";
import { useParams } from "@solidjs/router";

const ClipQueue = () => {
  const params = useParams();

  return (
    <>
      Ima clip queue with id of <code>{params.id}</code>
    </>
  );
};

export default ClipQueue;
