'use client'

import Button from "@/xUiDesign/components/Button"
import { Button as AntButton, Flex } from "antd"

export default function Home() {
    return (
        <div style={{ display: 'flex', gap: '100px' }}>
            <div>
                <h2>xUiDesign Button</h2>
                <Flex gap="small" align="flex-start" vertical>
                    <Flex gap="small">
                        <Button type="primary">Primary</Button>
                        <Button type="primary" disabled>
                            Primary(disabled)
                        </Button>
                    </Flex>
                    <Flex gap="small">
                        <Button>Default</Button>
                        <Button disabled>Default(disabled)</Button>
                    </Flex>
                    <Flex gap="small">
                        <Button type="dashed">Dashed</Button>
                        <Button type="dashed" disabled>
                            Dashed(disabled)
                        </Button>
                    </Flex>
                    <Flex gap="small">
                        <Button type="text">Text</Button>
                        <Button type="text" disabled>
                            Text(disabled)
                        </Button>
                    </Flex>
                    <Flex gap="small">
                        <Button href="https://vran.am" type="link">Link</Button>
                        <Button href="https://vran.am" type="link" disabled>
                            Link(disabled)
                        </Button>
                    </Flex>
                    <Flex gap="small">
                        <Button type="primary" href="https://ant.design/index-cn">
                            Href Primary
                        </Button>
                        <Button type="primary" href="https://ant.design/index-cn" disabled>
                            Href Primary(disabled)
                        </Button>
                    </Flex>
                    <Flex gap="small">
                        <Button danger>Danger Default</Button>
                        <Button danger disabled>
                            Danger Default(disabled)
                        </Button>
                    </Flex>
                    <Flex gap="small">
                        <Button danger type="text">
                            Danger Text
                        </Button>
                        <Button danger type="text" disabled>
                            Danger Text(disabled)
                        </Button>
                    </Flex>
                    <Flex gap="small">
                        <Button href="https://vran.am" type="link" danger>
                            Danger Link
                        </Button>
                        <Button href="https://vran.am" type="link" danger disabled>
                            Danger Link(disabled)
                        </Button>
                    </Flex>
                    <Flex gap="small" className="site-button-ghost-wrapper">
                        <Button ghost>Ghost</Button>
                        <Button ghost disabled>
                            Ghost(disabled)
                        </Button>
                    </Flex>
                </Flex>
            </div>

            <div>
                <h2>Ant Design Button</h2>
                <Flex gap="small" align="flex-start" vertical>
                    <Flex gap="small">
                        <AntButton type="primary">Primary</AntButton>
                        <AntButton type="primary" disabled>
                            Primary(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton>Default</AntButton>
                        <AntButton disabled>Default(disabled)</AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton type="dashed">Dashed</AntButton>
                        <AntButton type="dashed" disabled>
                            Dashed(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton type="text">Text</AntButton>
                        <AntButton type="text" disabled>
                            Text(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton href="https://vran.am" type="link">Link</AntButton>
                        <AntButton href="https://vran.am" type="link" disabled>
                            Link(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton type="primary" href="https://ant.design/index-cn">
                            Href Primary
                        </AntButton>
                        <AntButton type="primary" href="https://ant.design/index-cn" disabled>
                            Href Primary(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton danger>Danger Default</AntButton>
                        <AntButton danger disabled>
                            Danger Default(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton danger type="text">
                            Danger Text
                        </AntButton>
                        <AntButton danger type="text" disabled>
                            Danger Text(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton href="https://vran.am" type="link" danger>
                            Danger Link
                        </AntButton>
                        <AntButton href="https://vran.am" type="link" danger disabled>
                            Danger Link(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small" className="site-Antbutton-ghost-wrapper">
                        <AntButton ghost>Ghost</AntButton>
                        <AntButton ghost disabled>
                            Ghost(disabled)
                        </AntButton>
                    </Flex>
                </Flex>
            </div>
        </div>
    )
}