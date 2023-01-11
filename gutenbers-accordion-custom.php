<?php 

/*
    Plugin Name: Gutenbers Accordion Custom
    Description: Test plugin
    Version: 1.0
    Author: Anton Karpov
*/

if ( ! defined( 'ABSPATH' )) exit;

class GutenbergAccordionCustom {
    function __construct() {
        add_action('init', array($this, 'adminAssets'));
    }

    function adminAssets() {
        wp_register_script( 'accordionAdminScript', plugin_dir_url( __FILE__ ) . '/build/index.js', array('wp-blocks', 'wp-element', 'wp-block-editor') );
        wp_register_script( 'accordionFrontScript', plugin_dir_url( __FILE__ ) . '/assets/js/accordion.js' );
        wp_register_style('accordionStyles', plugin_dir_url( __FILE__ ) . '/assets/css/style.css');
        register_block_type( 'gutenberg-accordion-custom-plugin/gutenberg-accordion', array(
            'editor_script' => 'accordionAdminScript',
            'editor_style'  => 'accordionStyles',
            'style' => 'accordionStyles', 
            'script' => 'accordionFrontScript',
            'render_callback' => array($this, 'renderOutput')
        ) );
        if (is_admin()) { 
            wp_deregister_script( 'accordionFrontScript' );
        }
    }

    function renderOutput($attr) {
        ob_start(); ?>
            <div class="accordion" role="tablist">
                <?php 
                foreach ($attr['items'] as $key=>$item) {
                    ?>
                    <div class="accordion_item <?php $key == 0 ? print 'active' : ''?>" tabindex="0" role="tab">
                        <div class="item_title">
                            <p class="item_count"><?php $key + 1 < 10 ? print '0' . $key + 1 : print $key + 1 ?></p>
                            <p class="item_title_text"><?php echo $item['title'] ?></p>
                            <div class="open_button">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.00100708H6V6.00101H0V8.00101H6V14.001H8V8.00101H14V6.00101H8V0.00100708Z" fill="black"/>
                                </svg>
                            </div>
                        </div>
                        <div class="item_content">
                            <p><?php echo $item['text'] ?></p>
                        </div>
                    </div>
                <?php }
                ?>
            </div>
        <? return ob_get_clean();
    }
}

$gutenbergAccordionCustom = new GutenbergAccordionCustom();

?>