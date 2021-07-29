import Link from "next/link";

const LinkButton = ({name, url, style}) => (
    <Link href={url}>
        <a
            className={style}
        >
            {name}
        </a>
    </Link>
)

export default LinkButton
