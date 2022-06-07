import { Injectable } from '@angular/core';
import { DiagnosisInformation } from '../models/diagnosisInformation';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  diagnosisList = [
    new DiagnosisInformation(
      "Drug Reaction",
      "Internal Diseases",
      "An adverse drug reaction (ADR) is an injury caused by taking medication. ADRs may occur following a single dose or prolonged administration of a drug or result from the combination of two or more drugs.",
      ["Stop irritation","Consult nearest hospital","Stop taking drug","Follow up"]),
    new DiagnosisInformation(
      "Malaria",
      "Infectious Diseases",
      "An infectious disease caused by protozoan parasites from the Plasmodium family that can be transmitted by the bite of the Anopheles mosquito or by a contaminated needle or transfusion. Falciparum malaria is the most deadly type.",
      ["Consult nearest hospital","Avoid oily food","Avoid non veg food","Keep mosquitos out"]),
    new DiagnosisInformation(
      "Allergy",
      "Immunology",
      "An allergy is an immune system response to a foreign substance that's not typically harmful to your body.They can include certain foods, pollen, or pet dander. Your immune system's job is to keep you healthy by fighting harmful pathogens.",
      ["Apply calamine","Cover area with bandage","Use ice to compress itching"]),
    new DiagnosisInformation(
      "Hypothyroidism",
      "Endocrinology",
      "Hypothyroidism, also called underactive thyroid or low thyroid, is a disorder of the endocrine system in which the thyroid gland does not produce enough thyroid hormone.",
      ["Reduce stress","Exercise","Eat healthy","Get proper sleep"]),
    new DiagnosisInformation(
      "Psoriasis",
      "Dermatology",
      "Psoriasis is a common skin disorder that forms thick, red, bumpy patches covered with silvery scales. They can pop up anywhere, but most appear on the scalp, elbows, knees, and lower back. Psoriasis can't be passed from person to person. It does sometimes happen in members of the same family.",
      ["Wash hands with warm soapy water","Stop bleeding using pressure","Consult doctor","Salt baths"]),
    new DiagnosisInformation(
      "GERD",
      "Gastroenterology",
      "Gastroesophageal reflux disease, or GERD, is a digestive disorder that affects the lower esophageal sphincter (LES), the ring of muscle between the esophagus and stomach. Many people, including pregnant women, suffer from heartburn or acid indigestion caused by GERD.",
      ["Avoid fatty spicy food","Avoid lying down after eating","Maintain healthy weight","Exercise"]),
    new DiagnosisInformation(
      "Chronic Cholestasis",
      "Gastroenterology",
      "Chronic cholestatic diseases, whether occurring in infancy, childhood or adulthood, are characterized by defective bile acid transport from the liver to the intestine, which is caused by primary damage to the biliary epithelium in most cases",
      ["Cold baths","Anti itch medicine","Consult doctor","Eat healthy"]),
    new DiagnosisInformation(
      "Hepatitis A",
      "Infectious Diseases",
      "Hepatitis A is a highly contagious liver infection caused by the hepatitis A virus. The virus is one of several types of hepatitis viruses that cause inflammation and affect your liver's ability to function.",
      ["Consult nearest hospital","Wash hands through","Avoid fatty spicy food","Medication"]),
    new DiagnosisInformation(
      "Osteoarthritis",
      "Rheumatology",
      "Osteoarthritis is the most common form of arthritis, affecting millions of people worldwide. It occurs when the protective cartilage that cushions the ends of your bones wears down over time.",
      ["Acetaminophen","Consult nearest hospital","Follow up","Salt baths"]),
    new DiagnosisInformation(
      "(Vertigo) Paroxysmal Positional Vertigo",
      "Neurology",
      "Benign paroxysmal positional vertigo (BPPV) is one of the most common causes of vertigo — the sudden sensation that you're spinning or that the inside of your head is spinning. Benign paroxysmal positional vertigo causes brief episodes of mild to intense dizziness.",
      ["Lie down","Avoid sudden change in body","Avoid abrupt head movment","Relax"]),
    new DiagnosisInformation(
      "Hypoglycemia",
      "Endocrinology",
      "Hypoglycemia is a condition in which your blood sugar (glucose) level is lower than normal. Glucose is your body's main energy source. Hypoglycemia is often related to diabetes treatment. But other drugs and a variety of conditions — many rare — can cause low blood sugar in people who don't have diabetes.",
      ["Lie down on side","Check in pulse","Drink sugary drinks","Consult doctor"]),
    new DiagnosisInformation(
      "Acne",
      "Dermatology",
      "Acne vulgaris is the formation of comedones, papules, pustules, nodules, and/or cysts as a result of obstruction and inflammation of pilosebaceous units (hair follicles and their accompanying sebaceous gland). Acne develops on the face and upper trunk. It most often affects adolescents.",
      ["Bath twice","Avoid fatty spicy food","Drink plenty of water","Avoid too many products"]),
    new DiagnosisInformation(
      "Diabetes",
      "Endocrinology",
      "Diabetes is a disease that occurs when your blood glucose, also called blood sugar, is too high. Blood glucose is your main source of energy and comes from the food you eat. Insulin, a hormone made by the pancreas, helps glucose from food get into your cells to be used for energy.",
      ["Have balanced diet","Exercise","Consult doctor","Follow up"]),
    new DiagnosisInformation(
      "Impetigo",
      "Dermatology",
      "Impetigo is a common and highly contagious skin infection that mainly affects infants and children. Impetigo usually appears as red sores on the face, especially around a child's nose and mouth, and on hands and feet. The sores burst and develop honey-colored crusts.",
      ["Soak affected area in warm water","Use antibiotics","Remove scabs with wet compressed cloth","Consult doctor"]),
    new DiagnosisInformation(
      "Hypertension",
      "Internal Diseases",
      "Hypertension (HTN or HT), also known as high blood pressure (HBP), is a long-term medical condition in which the blood pressure in the arteries is persistently elevated. High blood pressure typically does not cause symptoms.",
      ["Meditation","Salt baths","Reduce stress","Get proper sleep"]),
    new DiagnosisInformation(
      "Peptic Ulcer Diseae",
      "Gastroenterology",
      "Peptic ulcer disease (PUD) is a break in the inner lining of the stomach, the first part of the small intestine, or sometimes the lower esophagus. An ulcer in the stomach is called a gastric ulcer, while one in the first part of the intestines is a duodenal ulcer.",
      ["Avoid fatty spicy food","Consume probiotic food","Eliminate milk","Limit alcohol"]),
    new DiagnosisInformation(
      "Dimorphic Hemorrhoids (Piles)",
      "General Surgery",
      "Hemorrhoids, also spelled haemorrhoids, are vascular structures in the anal canal. In their ... Other names, Haemorrhoids, piles, hemorrhoidal disease .",
      ["Avoid fatty spicy food","Consume probiotic food","Eliminate milk","Limit alcohol"]),
    new DiagnosisInformation(
      "Common Cold",
      "Internal Diseases",
      "The common cold is a viral infection of your nose and throat (upper respiratory tract). It's usually harmless, although it might not feel that way. Many types of viruses can cause a common cold.",
      ["Drink vitamin C rich drinks","Take vapour","Avoid cold food","Keep fever in check"]),
    new DiagnosisInformation(
      "Chicken Pox",
      "Infectious Diseases",
      "Chicken pox is a highly contagious disease caused by the varicella-zoster virus (VZV). It can cause an itchy, blister-like rash. The rash first appears on the chest, back, and face, and then spreads over the entire body, causing between 250 and 500 itchy blisters.",
      ["Use neem in bathing","Consume neem leaves","Take vaccine","Avoid public places"]),
    new DiagnosisInformation(
      "Cervical Spondylosis",
      "Rheumatology",
      "Cervical spondylosis is a general term for age-related wear and tear affecting the spinal disks in your neck. As the disks dehydrate and shrink, signs of osteoarthritis develop, including bony projections along the edges of bones (bone spurs).",
      ["Use heating pad or cold pack","Exercise","Take otc pain reliver","Consult doctor"]),
    new DiagnosisInformation(
      "Hyperthyroidism",
      "Internal Diseases",
      "Hyperthyroidism (overactive thyroid) occurs when your thyroid gland produces too much of the hormone thyroxine. Hyperthyroidism can accelerate your body's metabolism, causing unintentional weight loss and a rapid or irregular heartbeat.",
      ["Eat healthy","Massage","Use lemon balm","Take radioactive iodine treatment"]),
    new DiagnosisInformation(
      "Urinary Tract Infection",
      "Internal Diseases",
      "Urinary tract infection: An infection of the kidney, ureter, bladder, or urethra. Abbreviated UTI. Not everyone with a UTI has symptoms, but common symptoms include a frequent urge to urinate and pain or burning when urinating.",
      ["Drink plenty of water","Increase vitamin C intake","Drink cranberry juice","Take probiotics"]),
    new DiagnosisInformation(
      "Varicose Veins",
      "Internal Diseases",
      "A vein that has enlarged and twisted, often appearing as a bulging, blue blood vessel that is clearly visible through the skin. Varicose veins are most common in older adults, particularly women, and occur especially on the legs.",
      ["Lie down flat and raise the leg high","Use oinments","Use vein compression","Don't stand still for long"]),
    new DiagnosisInformation(
      "AIDS",
      "Immunology",
      "Acquired immunodeficiency syndrome (AIDS) is a chronic, potentially life-threatening condition caused by the human immunodeficiency virus (HIV). By damaging your immune system, HIV interferes with your body's ability to fight infection and disease.",
      ["Avoid open cuts","Wear personal protective equipment if possible","Consult doctor","Follow up"]),
    new DiagnosisInformation(
      "Paralysis (Brain Hemorrhage)",
      "Neurology",
      "Intracerebral hemorrhage (ICH) is when blood suddenly bursts into brain tissue, causing damage to your brain. Symptoms usually appear suddenly during ICH. They include headache, weakness, confusion, and paralysis, particularly on one side of your body.",
      ["Massage","Eat healthy","Exercise","Consult doctor"]),
    new DiagnosisInformation(
      "Typhoid",
      "Infectious Diseases",
      "An acute illness characterized by fever caused by infection with the bacterium Salmonella typhi. Typhoid fever has an insidious onset, with fever, headache, constipation, malaise, chills, and muscle pain. Diarrhea is uncommon, and vomiting is not usually severe.",
      ["Eat high calorie vegitables","Antiboitic therapy","Consult doctor","Medication"]),
    new DiagnosisInformation(
      "Hepatitis B",
      "Infectious Diseases",
      "Hepatitis B is an infection of your liver. It can cause scarring of the organ, liver failure, and cancer. It can be fatal if it isn't treated. It's spread when people come in contact with the blood, open sores, or body fluids of someone who has the hepatitis B virus.",
      ["Consult nearest hospital","Vaccination","Eat healthy","Medication"]),
    new DiagnosisInformation(
      "Fungal Infection",
      "Infectious Diseases",
      "In humans, fungal infections occur when an invading fungus takes over an area of the body and is too much for the immune system to handle. Fungi can live in the air, soil, water, and plants. There are also some fungi that live naturally in the human body. Like many microbes, there are helpful fungi and harmful fungi.",
      ["Bath twice","Use detol or neem in bathing water","Keep infected area dry","Use clean cloths"]),
    new DiagnosisInformation(
      "Hepatitis C",
      "Infectious Diseases",
      "Inflammation of the liver due to the hepatitis C virus (HCV), which is usually spread via blood transfusion (rare), hemodialysis, and needle sticks. The damage hepatitis C does to the liver can lead to cirrhosis and its complications as well as cancer.",
      ["Consult nearest hospital","Vaccination","Eat healthy","Medication"]),
    new DiagnosisInformation(
      "Migraine",
      "Neurology",
      "A migraine can cause severe throbbing pain or a pulsing sensation, usually on one side of the head. It's often accompanied by nausea, vomiting, and extreme sensitivity to light and sound. Migraine attacks can last for hours to days, and the pain can be so severe that it interferes with your daily activities.",
      ["Meditation","Reduce stress","Use polaroid glasses in sun","Consult doctor"]),
    new DiagnosisInformation(
      "Bronchial Asthma",
      "Chest Diseases",
      "Bronchial asthma is a medical condition which causes the airway path of the lungs to swell and narrow. Due to this swelling, the air path produces excess mucus making it hard to breathe, which results in coughing, short breath, and wheezing. The disease is chronic and interferes with daily working.",
      ["Switch to loose cloothing","Take deep breaths","Get away from trigger","Seek help"]),
    new DiagnosisInformation(
      "Alcoholic Hepatitis",
      "Gastroenterology",
      "Alcoholic hepatitis is a diseased, inflammatory condition of the liver caused by heavy alcohol consumption over an extended period of time. It's also aggravated by binge drinking and ongoing alcohol use. If you develop this condition, you must stop drinking alcohol",
      ["Stop alcohol consumption","Consult doctor","Medication","Follow up"]),
    new DiagnosisInformation(
      "Jaundice",
      "Internal Diseases",
      "Yellow staining of the skin and sclerae (the whites of the eyes) by abnormally high blood levels of the bile pigment bilirubin. The yellowing extends to other tissues and body fluids. Jaundice was once called the \"morbus regius\" (the regal disease) in the belief that only the touch of a king could cure it",
      ["Drink plenty of water","Consume milk thistle","Eat fruits and high fiberous food","Medication"]),
    new DiagnosisInformation(
      "Hepatitis E",
      "Infectious Diseases",
      "A rare form of liver inflammation caused by infection with the hepatitis E virus (HEV). It is transmitted via food or drink handled by an infected person or through infected water supplies in areas where fecal matter may get into the water. Hepatitis E does not cause chronic liver disease.",
      ["Stop alcohol consumption","Rest","Consult doctor","Medication"]),
    new DiagnosisInformation(
      "Dengue",
      "Infectious Diseases",
      "An acute infectious disease caused by a flavivirus (species Dengue virus of the genus Flavivirus), transmitted by aedes mosquitoes, and characterized by headache, severe joint pain, and a rash. — called also breakbone fever, dengue fever.",
      ["Drink papaya leaf juice","Avoid fatty spicy food","Keep mosquitos away","Keep hydrated"]),
    new DiagnosisInformation(
      "Hepatitis D",
      "Infectious Diseases",
      "Hepatitis D, also known as the hepatitis delta virus, is an infection that causes the liver to become inflamed. This swelling can impair liver function and cause long-term liver problems, including liver scarring and cancer. The condition is caused by the hepatitis D virus (HDV).",
      ["Consult doctor","Medication","Eat healthy","Follow up"]),
    new DiagnosisInformation(
      "Heart Attack",
      "Cardiology",
      "The death of heart muscle due to the loss of blood supply. The loss of blood supply is usually caused by a complete blockage of a coronary artery, one of the arteries that supplies blood to the heart muscle.",
      ["Call ambulance","Chew or swallow asprin","Keep calm"]),
    new DiagnosisInformation(
      "Pneumonia",
      "Chest Diseases",
      "Pneumonia is an infection in one or both lungs. Bacteria, viruses, and fungi cause it. The infection causes inflammation in the air sacs in your lungs, which are called alveoli. The alveoli fill with fluid or pus, making it difficult to breathe.",
      ["Consult doctor","Medication","Rest","Follow up"]),
    new DiagnosisInformation(
      "Arthritis",
      "Rheumatology",
      "Arthritis is the swelling and tenderness of one or more of your joints. The main symptoms of arthritis are joint pain and stiffness, which typically worsen with age. The most common types of arthritis are osteoarthritis and rheumatoid arthritis.",
      ["Exercise","Use hot and cold therapy","Try acupuncture","Massage"]),
    new DiagnosisInformation(
      "Gastroenteritis",
      "Gastroenterology",
      "Gastroenteritis is an inflammation of the digestive tract, particularly the stomach, and large and small intestines. Viral and bacterial gastroenteritis are intestinal infections associated with symptoms of diarrhea , abdominal cramps, nausea , and vomiting .",
      ["Stop eating solid food for while","Try taking small sips of water","Rest","Ease back into eating"]),
    new DiagnosisInformation(
      "Tuberculosis",
      "Infectious Diseases",
      "Tuberculosis (TB) is an infectious disease usually caused by Mycobacterium tuberculosis (MTB) bacteria. Tuberculosis generally affects the lungs, but can also affect other parts of the body. Most infections show no symptoms, in which case it is known as latent tuberculosis.",
      ["Cover mouth","Consult doctor","Medication","Rest"])
    ]

  constructor() { }

    getDiagnosisInformation(diagnosisName: string) : DiagnosisInformation{
      var result = this.diagnosisList.find( el => el.name == diagnosisName.trimEnd());

      if(result != null)
        return result;
      else
        return new DiagnosisInformation("","","",[]);
    }

  }
