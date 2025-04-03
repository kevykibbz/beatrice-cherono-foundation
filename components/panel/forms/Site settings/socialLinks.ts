import { SocialMediaPlatform } from "@/types/types";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export const platforms: SocialMediaPlatform[] = [
  {
    name: "facebook",
    value: "facebook",
    label: "Facebook",
    Icon: FacebookIcon,
    placeholder: "https://facebook.com/username",
  },
  {
    name: "twitter",
    value: "twitter",
    label: "Twitter",
    Icon: TwitterIcon,
    placeholder: "https://twitter.com/username",
  },
  {
    name: "instagram",
    value: "instagram",
    label: "Instagram",
    Icon: InstagramIcon,
    placeholder: "https://instagram.com/username",
  },
  {
    name: "linkedin",
    value: "linkedin",
    label: "LinkedIn",
    Icon: LinkedinIcon,
    placeholder: "https://linkedin.com/company/username",
  },
  {
    name: "tiktok",
    value: "tiktok",
    label: "TikTok",
    Icon: FaTiktok,
    placeholder: "https://tiktok.com/@username",
  },
  {
    name: "youtube",
    value: "youtube",
    label: "YouTube",
    Icon: YoutubeIcon,
    placeholder: "https://youtube.com/@username",
  },
];