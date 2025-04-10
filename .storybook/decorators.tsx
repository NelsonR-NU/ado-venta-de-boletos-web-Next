import React, { ComponentType, useEffect, useState } from "react";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { StoryContext } from "@storybook/react";

export const withNextIntl = (Story: ComponentType, { globals }: StoryContext) => {
  const locale = globals.locale || "es";

  const MessageLoader = () => {
    const [messages, setMessages] = useState<AbstractIntlMessages>();

    useEffect(() => {
      const loadMessages = async () => {
        const importedModule = await import(`../src/i18n/messages/${locale}.json`);
        setMessages(importedModule.default || importedModule);
      };

      loadMessages();
    }, []);

    return (
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
        <Story />
      </NextIntlClientProvider>
    );
  };

  return <MessageLoader />;
};

export const withTailwind = (Story: ComponentType) => (
  <div className="p-4">
    <Story />
  </div>
);
