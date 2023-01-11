import { RichText } from '@wordpress/block-editor';

wp.blocks.registerBlockType('gutenberg-accordion-custom-plugin/gutenberg-accordion', {
    title: 'Accordion',
    description: 'Just a custom gutenberg acordion widget',
    icon: 'archive',
    category: 'text',
    attributes: {
        items: {
            type: 'array',
            default: [
                {
                    title: 'Title', 
                    text: 'Content'
                }
            ]
        }
    },
    edit: (props) => {

		const handleAddItem = () => {
			const items = [ ...props.attributes.items ];
			items.push( {
				title: 'Title',
                text: 'Content'
			} );
			props.setAttributes( { items } );
		};

        const handleRemoveItem = ( index ) => {
			const items = [ ...props.attributes.items ];
            if (items.length > 1) {
                items.splice( index, 1 )
                props.setAttributes( { items } )
            }
		};

		const handleItemChange = ( att, item, index ) => {
			const items = [ ...props.attributes.items ];
            items[ index ][att] = item 
			props.setAttributes( { items } );
		};

        const itemsDisplay = props.attributes.items.map( ( item, index ) => {
            return (
                <div className={"accordion_item active"} key={ index } >
                    <div className="item_title">
                        <p className="item_count">{ index + 1 < 10 ? '0' + (index + 1) : index + 1 } </p>
                        <RichText
                            className='item_title_text'
                            tagName="p" 
                            value={ props.attributes.items[ index ].title } 
                            allowedFormats={[]}
                            onChange={ ( item ) => handleItemChange( 'title', item, index ) } 
                        />
                        <div className="open_button" onClick={ () => handleRemoveItem( index ) }>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.00100708H6V6.00101H0V8.00101H6V14.001H8V8.00101H14V6.00101H8V0.00100708Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                    <div className="item_content">
                        <RichText
                            className='item_title_text'
                            tagName="p" 
                            value={ props.attributes.items[ index ].text } 
                            onChange={ ( item ) => handleItemChange( 'text', item, index ) } 
                        />
                    </div>
                </div>
            );
        } );

        return (
            <div className="accordion">
                { itemsDisplay }
                <div className="add_button" onClick={ () => handleAddItem() }>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.00100708H6V6.00101H0V8.00101H6V14.001H8V8.00101H14V6.00101H8V0.00100708Z" fill="black"/>
                    </svg>
                </div>
            </div>
        )
    },
    save: () => {
        return null
    }
})