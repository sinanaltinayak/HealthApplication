import { Injectable } from '@angular/core';
import { DiagnosisDescription } from '../models/diagnosisDescription';
import { DiagnosisPrecaution } from '../models/diagnosisPrecaution';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  diagnosisList = [
    new DiagnosisDescription("Drug Reaction","An adverse drug reaction (ADR) is an injury caused by taking medication. ADRs may occur following a single dose or prolonged administration of a drug or result from the combination of two or more drugs."),
    new DiagnosisDescription("Malaria","An infectious disease caused by protozoan parasites from the Plasmodium family that can be transmitted by the bite of the Anopheles mosquito or by a contaminated needle or transfusion. Falciparum malaria is the most deadly type."),
    new DiagnosisDescription("Allergy","An allergy is an immune system response to a foreign substance that's not typically harmful to your body.They can include certain foods, pollen, or pet dander. Your immune system's job is to keep you healthy by fighting harmful pathogens."),
    new DiagnosisDescription("Hypothyroidism","Hypothyroidism, also called underactive thyroid or low thyroid, is a disorder of the endocrine system in which the thyroid gland does not produce enough thyroid hormone."),
    new DiagnosisDescription("Psoriasis","Psoriasis is a common skin disorder that forms thick, red, bumpy patches covered with silvery scales. They can pop up anywhere, but most appear on the scalp, elbows, knees, and lower back. Psoriasis can't be passed from person to person. It does sometimes happen in members of the same family."),
    new DiagnosisDescription("GERD","Gastroesophageal reflux disease, or GERD, is a digestive disorder that affects the lower esophageal sphincter (LES), the ring of muscle between the esophagus and stomach. Many people, including pregnant women, suffer from heartburn or acid indigestion caused by GERD."),
    new DiagnosisDescription("Chronic Cholestasis","Chronic cholestatic diseases, whether occurring in infancy, childhood or adulthood, are characterized by defective bile acid transport from the liver to the intestine, which is caused by primary damage to the biliary epithelium in most cases"),
    new DiagnosisDescription("Hepatitis A","Hepatitis A is a highly contagious liver infection caused by the hepatitis A virus. The virus is one of several types of hepatitis viruses that cause inflammation and affect your liver's ability to function."),
    new DiagnosisDescription("Osteoarthritis","Osteoarthritis is the most common form of arthritis, affecting millions of people worldwide. It occurs when the protective cartilage that cushions the ends of your bones wears down over time."),
    new DiagnosisDescription("(Vertigo) Paroxysmal Positional Vertigo","Benign paroxysmal positional vertigo (BPPV) is one of the most common causes of vertigo — the sudden sensation that you're spinning or that the inside of your head is spinning. Benign paroxysmal positional vertigo causes brief episodes of mild to intense dizziness."),
    new DiagnosisDescription("Hypoglycemia","Hypoglycemia is a condition in which your blood sugar (glucose) level is lower than normal. Glucose is your body's main energy source. Hypoglycemia is often related to diabetes treatment. But other drugs and a variety of conditions — many rare — can cause low blood sugar in people who don't have diabetes."),
    new DiagnosisDescription("Acne","Acne vulgaris is the formation of comedones, papules, pustules, nodules, and/or cysts as a result of obstruction and inflammation of pilosebaceous units (hair follicles and their accompanying sebaceous gland). Acne develops on the face and upper trunk. It most often affects adolescents."),
    new DiagnosisDescription("Diabetes","Diabetes is a disease that occurs when your blood glucose, also called blood sugar, is too high. Blood glucose is your main source of energy and comes from the food you eat. Insulin, a hormone made by the pancreas, helps glucose from food get into your cells to be used for energy."),
    new DiagnosisDescription("Impetigo","Impetigo is a common and highly contagious skin infection that mainly affects infants and children. Impetigo usually appears as red sores on the face, especially around a child's nose and mouth, and on hands and feet. The sores burst and develop honey-colored crusts."),
    new DiagnosisDescription("Hypertension","Hypertension (HTN or HT), also known as high blood pressure (HBP), is a long-term medical condition in which the blood pressure in the arteries is persistently elevated. High blood pressure typically does not cause symptoms."),
    new DiagnosisDescription("Peptic Ulcer Diseae","Peptic ulcer disease (PUD) is a break in the inner lining of the stomach, the first part of the small intestine, or sometimes the lower esophagus. An ulcer in the stomach is called a gastric ulcer, while one in the first part of the intestines is a duodenal ulcer."),
    new DiagnosisDescription("Dimorphic Hemorrhoids (Piles)","Hemorrhoids, also spelled haemorrhoids, are vascular structures in the anal canal. In their ... Other names, Haemorrhoids, piles, hemorrhoidal disease ."),
    new DiagnosisDescription("Common Cold","The common cold is a viral infection of your nose and throat (upper respiratory tract). It's usually harmless, although it might not feel that way. Many types of viruses can cause a common cold."),
    new DiagnosisDescription("Chicken Pox","Chicken pox is a highly contagious disease caused by the varicella-zoster virus (VZV). It can cause an itchy, blister-like rash. The rash first appears on the chest, back, and face, and then spreads over the entire body, causing between 250 and 500 itchy blisters."),
    new DiagnosisDescription("Cervical Spondylosis","Cervical spondylosis is a general term for age-related wear and tear affecting the spinal disks in your neck. As the disks dehydrate and shrink, signs of osteoarthritis develop, including bony projections along the edges of bones (bone spurs)."),
    new DiagnosisDescription("Hyperthyroidism","Hyperthyroidism (overactive thyroid) occurs when your thyroid gland produces too much of the hormone thyroxine. Hyperthyroidism can accelerate your body's metabolism, causing unintentional weight loss and a rapid or irregular heartbeat."),
    new DiagnosisDescription("Urinary Tract Infection","Urinary tract infection: An infection of the kidney, ureter, bladder, or urethra. Abbreviated UTI. Not everyone with a UTI has symptoms, but common symptoms include a frequent urge to urinate and pain or burning when urinating."),
    new DiagnosisDescription("Varicose Veins","A vein that has enlarged and twisted, often appearing as a bulging, blue blood vessel that is clearly visible through the skin. Varicose veins are most common in older adults, particularly women, and occur especially on the legs."),
    new DiagnosisDescription("AIDS","Acquired immunodeficiency syndrome (AIDS) is a chronic, potentially life-threatening condition caused by the human immunodeficiency virus (HIV). By damaging your immune system, HIV interferes with your body's ability to fight infection and disease."),
    new DiagnosisDescription("Paralysis (Brain Hemorrhage)","Intracerebral hemorrhage (ICH) is when blood suddenly bursts into brain tissue, causing damage to your brain. Symptoms usually appear suddenly during ICH. They include headache, weakness, confusion, and paralysis, particularly on one side of your body."),
    new DiagnosisDescription("Typhoid","An acute illness characterized by fever caused by infection with the bacterium Salmonella typhi. Typhoid fever has an insidious onset, with fever, headache, constipation, malaise, chills, and muscle pain. Diarrhea is uncommon, and vomiting is not usually severe."),
    new DiagnosisDescription("Hepatitis B","Hepatitis B is an infection of your liver. It can cause scarring of the organ, liver failure, and cancer. It can be fatal if it isn't treated. It's spread when people come in contact with the blood, open sores, or body fluids of someone who has the hepatitis B virus."),
    new DiagnosisDescription("Fungal Infection","In humans, fungal infections occur when an invading fungus takes over an area of the body and is too much for the immune system to handle. Fungi can live in the air, soil, water, and plants. There are also some fungi that live naturally in the human body. Like many microbes, there are helpful fungi and harmful fungi."),
    new DiagnosisDescription("Hepatitis C","Inflammation of the liver due to the hepatitis C virus (HCV), which is usually spread via blood transfusion (rare), hemodialysis, and needle sticks. The damage hepatitis C does to the liver can lead to cirrhosis and its complications as well as cancer."),
    new DiagnosisDescription("Migraine","A migraine can cause severe throbbing pain or a pulsing sensation, usually on one side of the head. It's often accompanied by nausea, vomiting, and extreme sensitivity to light and sound. Migraine attacks can last for hours to days, and the pain can be so severe that it interferes with your daily activities."),
    new DiagnosisDescription("Bronchial Asthma","Bronchial asthma is a medical condition which causes the airway path of the lungs to swell and narrow. Due to this swelling, the air path produces excess mucus making it hard to breathe, which results in coughing, short breath, and wheezing. The disease is chronic and interferes with daily working."),
    new DiagnosisDescription("Alcoholic Hepatitis","Alcoholic hepatitis is a diseased, inflammatory condition of the liver caused by heavy alcohol consumption over an extended period of time. It's also aggravated by binge drinking and ongoing alcohol use. If you develop this condition, you must stop drinking alcohol"),
    new DiagnosisDescription("Jaundice","Yellow staining of the skin and sclerae (the whites of the eyes) by abnormally high blood levels of the bile pigment bilirubin. The yellowing extends to other tissues and body fluids. Jaundice was once called the \"morbus regius\" (the regal disease) in the belief that only the touch of a king could cure it"),
    new DiagnosisDescription("Hepatitis E","A rare form of liver inflammation caused by infection with the hepatitis E virus (HEV). It is transmitted via food or drink handled by an infected person or through infected water supplies in areas where fecal matter may get into the water. Hepatitis E does not cause chronic liver disease."),
    new DiagnosisDescription("Dengue","An acute infectious disease caused by a flavivirus (species Dengue virus of the genus Flavivirus), transmitted by aedes mosquitoes, and characterized by headache, severe joint pain, and a rash. — called also breakbone fever, dengue fever."),
    new DiagnosisDescription("Hepatitis D","Hepatitis D, also known as the hepatitis delta virus, is an infection that causes the liver to become inflamed. This swelling can impair liver function and cause long-term liver problems, including liver scarring and cancer. The condition is caused by the hepatitis D virus (HDV)."),
    new DiagnosisDescription("Heart Attack","The death of heart muscle due to the loss of blood supply. The loss of blood supply is usually caused by a complete blockage of a coronary artery, one of the arteries that supplies blood to the heart muscle."),
    new DiagnosisDescription("Pneumonia","Pneumonia is an infection in one or both lungs. Bacteria, viruses, and fungi cause it. The infection causes inflammation in the air sacs in your lungs, which are called alveoli. The alveoli fill with fluid or pus, making it difficult to breathe."),
    new DiagnosisDescription("Arthritis","Arthritis is the swelling and tenderness of one or more of your joints. The main symptoms of arthritis are joint pain and stiffness, which typically worsen with age. The most common types of arthritis are osteoarthritis and rheumatoid arthritis."),
    new DiagnosisDescription("Gastroenteritis","Gastroenteritis is an inflammation of the digestive tract, particularly the stomach, and large and small intestines. Viral and bacterial gastroenteritis are intestinal infections associated with symptoms of diarrhea , abdominal cramps, nausea , and vomiting ."),
    new DiagnosisDescription("Tuberculosis","Tuberculosis (TB) is an infectious disease usually caused by Mycobacterium tuberculosis (MTB) bacteria. Tuberculosis generally affects the lungs, but can also affect other parts of the body. Most infections show no symptoms, in which case it is known as latent tuberculosis.")
    ]


    diagnosisPrecautionList =
    [
      new DiagnosisPrecaution("Drug Reaction",["stop irritation","consult nearest hospital","stop taking drug","follow up"]),
      new DiagnosisPrecaution("Malaria",["Consult nearest hospital","avoid oily food","avoid non veg food","keep mosquitos out"]),
      new DiagnosisPrecaution("Allergy",["apply calamine","cover area with bandage","use ice to compress itching"]),
      new DiagnosisPrecaution("Hypothyroidism",["reduce stress","exercise","eat healthy","get proper sleep"]),
      new DiagnosisPrecaution("Psoriasis",["wash hands with warm soapy water","stop bleeding using pressure","consult doctor","salt baths"]),
      new DiagnosisPrecaution("GERD",["avoid fatty spicy food","avoid lying down after eating","maintain healthy weight","exercise"]),
      new DiagnosisPrecaution("Chronic Cholestasis",["cold baths","anti itch medicine","consult doctor","eat healthy"]),
      new DiagnosisPrecaution("Hepatitis A",["Consult nearest hospital","wash hands through","avoid fatty spicy food","medication"]),
      new DiagnosisPrecaution("Osteoarthritis",["acetaminophen","consult nearest hospital","follow up","salt baths"]),
      new DiagnosisPrecaution("(Vertigo) Paroxysmal Positional Vertigo",["lie down","avoid sudden change in body","avoid abrupt head movment","relax"]),
      new DiagnosisPrecaution("Hypoglycemia",["lie down on side","check in pulse","drink sugary drinks","consult doctor"]),
      new DiagnosisPrecaution("Acne",["bath twice","avoid fatty spicy food","drink plenty of water","avoid too many products"]),
      new DiagnosisPrecaution("Diabetes",["have balanced diet","exercise","consult doctor","follow up"]),
      new DiagnosisPrecaution("Impetigo",["soak affected area in warm water","use antibiotics","remove scabs with wet compressed cloth","consult doctor"]),
      new DiagnosisPrecaution("Hypertension",["meditation","salt baths","reduce stress","get proper sleep"]),
      new DiagnosisPrecaution("Peptic Ulcer Diseae",["avoid fatty spicy food","consume probiotic food","eliminate milk","limit alcohol"]),
      new DiagnosisPrecaution("Dimorphic Hemorrhoids (Piles)",["avoid fatty spicy food","consume witch hazel","warm bath with epsom salt","consume alovera juice"]),
      new DiagnosisPrecaution("Common Cold",["drink vitamin c rich drinks","take vapour","avoid cold food","keep fever in check"]),
      new DiagnosisPrecaution("Chicken Pox",["use neem in bathing","consume neem leaves","take vaccine","avoid public places"]),
      new DiagnosisPrecaution("Cervical Spondylosis",["use heating pad or cold pack","exercise","take otc pain reliver","consult doctor"]),
      new DiagnosisPrecaution("Hyperthyroidism",["eat healthy","massage","use lemon balm","take radioactive iodine treatment"]),
      new DiagnosisPrecaution("Urinary Tract Infection",["drink plenty of water","increase vitamin c intake","drink cranberry juice","take probiotics"]),
      new DiagnosisPrecaution("Varicose Veins",["lie down flat and raise the leg high","use oinments","use vein compression","dont stand still for long"]),
      new DiagnosisPrecaution("AIDS",["avoid open cuts","wear ppe if possible","consult doctor","follow up"]),
      new DiagnosisPrecaution("Paralysis (Brain Hemorrhage)",["massage","eat healthy","exercise","consult doctor"]),
      new DiagnosisPrecaution("Typhoid",["eat high calorie vegitables","antiboitic therapy","consult doctor","medication"]),
      new DiagnosisPrecaution("Hepatitis B",["consult nearest hospital","vaccination","eat healthy","medication"]),
      new DiagnosisPrecaution("Fungal Infection",["bath twice","use detol or neem in bathing water","keep infected area dry","use clean cloths"]),
      new DiagnosisPrecaution("Hepatitis C",["Consult nearest hospital","vaccination","eat healthy","medication"]),
      new DiagnosisPrecaution("Migraine",["meditation","reduce stress","use poloroid glasses in sun","consult doctor"]),
      new DiagnosisPrecaution("Bronchial Asthma",["switch to loose cloothing","take deep breaths","get away from trigger","seek help"]),
      new DiagnosisPrecaution("Alcoholic Hepatitis",["stop alcohol consumption","consult doctor","medication","follow up"]),
      new DiagnosisPrecaution("Jaundice",["drink plenty of water","consume milk thistle","eat fruits and high fiberous food","medication"]),
      new DiagnosisPrecaution("Hepatitis E",["stop alcohol consumption","rest","consult doctor","medication"]),
      new DiagnosisPrecaution("Dengue",["drink papaya leaf juice","avoid fatty spicy food","keep mosquitos away","keep hydrated"]),
      new DiagnosisPrecaution("Hepatitis D",["consult doctor","medication","eat healthy","follow up"]),
      new DiagnosisPrecaution("Heart Attack",["call ambulance","chew or swallow asprin","keep calm",""]),
      new DiagnosisPrecaution("Pneumonia",["consult doctor","medication","rest","follow up"]),
      new DiagnosisPrecaution("Arthritis",["exercise","use hot and cold therapy","try acupuncture","massage"]),
      new DiagnosisPrecaution("Gastroenteritis",["stop eating solid food for while","try taking small sips of water","rest","ease back into eating"]),
      new DiagnosisPrecaution("Tuberculosis",["cover mouth","consult doctor","medication","rest"])
      ]
    

  constructor() { }

  }
