package com.sensia.swetools.editors.sensorml.client.panels.widgets.sml;

import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Image;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.TextBox;
import com.sensia.relaxNG.RNGAttribute;
import com.sensia.relaxNG.RNGValue;
import com.sensia.swetools.editors.sensorml.client.listeners.IButtonCallback;
import com.sensia.swetools.editors.sensorml.client.ontology.OntologyPanel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.SensorAttributeWidget;
import com.sensia.swetools.editors.sensorml.client.utils.Utils;

public class SMLSensorAttributeWidget extends SensorAttributeWidget{

	private Image defImage;
	private RNGAttribute attribute;
	
	public SMLSensorAttributeWidget(RNGAttribute attribute) {
		super(attribute.getName(),TAG_DEF.SML,TAG_TYPE.ATTRIBUTE);
		
		this.attribute = attribute;
		container = new HorizontalPanel();
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
	}
	
	@Override
	protected void addSensorWidget(final ISensorWidget widget) {
		if(getName().equals("definition") && widget.getType() == TAG_TYPE.VALUE) {
			defImage = new Image(GWT.getModuleBaseURL()+"images/icon_info.png");
			defImage.setTitle(widget.getName());
			defImage.addClickHandler(new ClickHandler() {
				
				@Override
				public void onClick(ClickEvent event) {
					Window.open(widget.getName(),"","");
				}
			});
			
			defImage.addStyleName("graphic-icon");
			container.add(defImage);
		} else {
			super.addSensorWidget(widget);
		}
	}
	
	@Override
	public void getAdvancedPanel(Panel container) {
		if(getName().equals("definition")) {
			HorizontalPanel hPanel = new HorizontalPanel();
			HTML hlabel = new HTML(getName());
			hlabel.setWidth("100px");
			hPanel.add(hlabel);
			
			final TextBox valueBox = new TextBox();
			//subtract from icon size (16px) and icon style (margin-left:15px)
			valueBox.setWidth("469px");
			valueBox.setText(this.getValue("definition"));
			
			hPanel.add(valueBox);
			
			Image ontologyImage = new Image(GWT.getModuleBaseURL()+"images/ontology.png");
			ontologyImage.setTitle("Ontology");
			ontologyImage.setStyleName("ontology-icon");
			
			ontologyImage.addClickHandler(new ClickHandler() {
				
				@Override
				public void onClick(ClickEvent event) {
					if(getMode() == MODE.EDIT) {
						final OntologyPanel ontologyPanel = new OntologyPanel();
						final DialogBox dialogBox = Utils.createEditDialogBox(ontologyPanel.getPanel(),"SWE Ontology",new IButtonCallback() {
							
							@Override
							public void onClick() {
								String value = ontologyPanel.getSelectedValue();
								setValue(getName(),value);
								valueBox.setText(value);
							}
						});
						dialogBox.show();
					} 
				}
			});
			
			hPanel.add(ontologyImage);
			
			container.add(hPanel);
		} else {
			super.getAdvancedPanel(container);
		}
	}
	
	@Override
	public void setValue(String elementName,String value) {
		if(getName().equals(elementName)) {
			defImage.setTitle(value);
			RNGValue rngValue = attribute.getChildValue();
			if(value != null) {
				rngValue.setText(value);
			}
			//should get only 1 element: the widget value
			ISensorWidget valueWidget = getElements().get(0);
			if(valueWidget != null) {
				valueWidget.setValue(getName(), value);
			}
		}
	}
	
	@Override
	public void refresh() {
		super.refresh();
		RNGValue rngValue = attribute.getChildValue();
		if(defImage != null) {
			defImage.setTitle(rngValue.getText());
		}
	}
	
	@Override
	public APPENDER appendTo() {
		return (getName().equals("definition")) ? APPENDER.HORIZONTAL:APPENDER.NONE;
	}
}
