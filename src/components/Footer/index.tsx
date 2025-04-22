import getLiferayFooter from "@/services/liferay/getLiferayFooter";

const Footer = async () => {
  const footerHtml = await getLiferayFooter();

  if (!footerHtml) {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: footerHtml }} />;
};

export default Footer;
