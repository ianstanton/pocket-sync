export type Screenshot = {
  file_name: string
  file: File
  platform: string
  game: string
  author: string
  core: string
  timestamp: Date
}

export type VideoJSON = {
  video: {
    magic: "APF_VER_1"
    scaler_modes: {
      width: number
      height: number
      aspect_w: number
      aspect_h: number
      rotation: number
      mirror: 0 | 1
    }[]
  }
}

export type DataJSON = {
  data: {
    magic: "APF_VER_1"
    data_slots: DataSlotJSON[]
  }
}

export type InstanceDataJSON = {
  instance: {
    data_path?: string
    data_slots: DataSlotJSON[]
  }
}

export type DataSlotJSON = {
  id: number
  name?: string
  required?: boolean
  parameters?: number | string
  extensions?: string[]
  filename?: string
  alternate_filenames?: string[]
  md5?: string
}

export type RequiredFileInfo = {
  filename: string
  path: string
  exists: boolean
  type: "core" | "instance"
  crc32?: number
  mtime?: number
  status?:
    | "ok"
    | "wrong"
    | "downloadable"
    | "not_in_archive"
    | "at_root"
    | "at_root_match"
    | "at_root_mismatch"
  md5?: string
}

export type PlatformId = string
export type Category = string
type AuthorName = string
type Semver = `${number}.${number}.${number}`

export type PlatformInfoJSON = {
  platform: {
    category?: Category
    name: string
    year: number
    manufacturer: string
  }
}

export type CoreInfoJSON = {
  core: {
    magic: "APF_VER_1"
    metadata: {
      platform_ids: PlatformId[]
      shortname: string
      description: string
      author: AuthorName
      url?: string
      version: Semver | string
      date_release: string
    }
    framework: {
      target_product: "Analogue Pocket"
      version_required: string
      sleep_supported: boolean
      dock: {
        supported: boolean
        analog_output: boolean
      }
      hardware: {
        link_port: boolean
        cartridge_adapter: -1 | 0
      }
    }
    cores: {
      name: string
      id: number | string
      filename: string
    }[]
  }
}

export type InputKey =
  | "pad_btn_a"
  | "pad_btn_b"
  | "pad_btn_x"
  | "pad_btn_y"
  | "pad_trig_l"
  | "pad_trig_r"
  | "pad_btn_start"
  | "pad_btn_select"

export type InputJSON = {
  input: {
    magic: "APF_VER_1"
    controllers?: {
      type: "default"
      mappings: {
        id: number | string
        name: string
        key: InputKey
      }[]
    }[]
  }
}

export type InventoryJSON = {
  data: InventoryItem[]
}

export type InventoryItem = {
  replaced_by?: string
  replaces?: string[]

  identifier: string
  platform_id: PlatformId

  requires_license: boolean

  repository: {
    platform: "github" | string
    owner: string
    name: string
  }
  release_date: string
  download_url: string
  version: Semver | string
  sponsor?: {
    [k: string]: [string] | string
  }
  platform: {
    category: string
    name: string
    manufacturer: string
    year: number
  }
  assets: [
    {
      platform: PlatformId
      filename?: string
      extensions?: string[]
    }
  ]
}

export type GithubRelease = {
  html_url: string
  id: number
  tag_name: string
  name: string
  body: string
  draft: boolean
  prerelease: boolean
  created_at: string
  published_at: string
  assets: {
    browser_download_url: string
    name: string
    label: string
    content_type: string
    size: 1024
  }[]
}

export type FetchType = { type: string; destination: string } & (
  | { type: "archive.org"; name: string; extensions?: string[] }
  | { type: "filesystem"; path: string; extensions?: string[] }
)

export type PocketColour =
  | "white"
  | "black"
  | "glow"
  | "trans_clear"
  | "trans_smoke"
  | "trans_blue"
  | "trans_green"
  | "trans_purple"
  | "trans_orange"
  | "trans_red"
  | "indigo"
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "pink"
  | "orange"
  | "silver"

export type PocketSyncConfig = {
  version: string
  colour: PocketColour
  button_colour?: PocketColour
  archive_url: string | null
  saves: SaveConfig[]
  skipAlternateAssets?: boolean
  fetches?: FetchType[]
}

export type SaveConfig = {
  type: "zip"
  backup_location: string
  backup_count: number
}

export type SaveZipFile = {
  filename: string
  last_modified: number
  crc32: number
}

export type ArchiveFileMetadata = {
  name: string
  crc32: string
  mtime: string
}

export type ImagePack = {
  owner: string
  repository: string
  variant?: string
}

export type RawFeedItem = {
  title: string
  link: string
  published: number
  content: string
  categories: ["feed", AuthorName, string, "new" | "update"]
}

export type FeedItem = {
  type: "new" | "update"
  coreName: string
  published: Date
  content: string
  title: string
  link: string
}

export type FirmwareListItem = {
  version: string
  product: "pocket"
  publishedAt: Date
  url: string
}

export type FirmwareInfo = {
  version: string
  file_size: string
  file_name: string
  md5: string
  download_url?: string
  publishedAt: Date
  release_notes_html: string
}

export type FileCopy = { origin: string; destination: string; exists: boolean }

export type RootFileZipped = {
  crc32: number
  type: "Zipped"
  inner_file: string
  zip_file: string
  md5: string
}

export type RootFileUnZipped = {
  crc32: number
  type: "UnZipped"
  file_name: string
  md5: string
}

export type RootFile = RootFileZipped | RootFileUnZipped
