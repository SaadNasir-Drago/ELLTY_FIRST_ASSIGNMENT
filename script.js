// Interactive functionality for the checkbox components

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth animations and interactions
    
    // Track checkbox changes
    const checkboxes = document.querySelectorAll('.checkbox-input');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Add a subtle ripple effect on change
            const customCheckbox = this.nextElementSibling;
            customCheckbox.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                customCheckbox.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Done button interactions
    const doneButtons = document.querySelectorAll('.done-button');
    
    doneButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Log action (in real app, this would trigger actual functionality)
            console.log('Done button clicked');
        });
    });
    
    // "All pages" master checkbox functionality for page selection
    const pageSelection = document.querySelector('.page-selection');
    if (pageSelection) {
        const allPagesCheckbox = pageSelection.querySelector('.checkbox-input');
        const pageCheckboxes = Array.from(pageSelection.querySelectorAll('.checkbox-input')).slice(1);
        
        // When "All pages" is clicked, toggle all page checkboxes
        allPagesCheckbox?.addEventListener('change', function() {
            const isChecked = this.checked;
            pageCheckboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
        });
        
        // When any individual page checkbox changes, update "All pages" accordingly
        pageCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const allChecked = pageCheckboxes.every(cb => cb.checked);
                const someChecked = pageCheckboxes.some(cb => cb.checked);
                
                if (allPagesCheckbox) {
                    allPagesCheckbox.checked = allChecked;
                    allPagesCheckbox.indeterminate = someChecked && !allChecked;
                }
            });
        });
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            
            if (focusedElement.classList.contains('checkbox-item')) {
                e.preventDefault();
                const checkbox = focusedElement.querySelector('.checkbox-input');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            }
        }
    });
    
    // Make checkbox items keyboard accessible
    const checkboxItems = document.querySelectorAll('.checkbox-item');
    checkboxItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const checkbox = this.querySelector('.checkbox-input');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            }
        });
    });
});
